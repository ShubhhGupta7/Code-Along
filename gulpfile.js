const gulp = require('gulp');
// gulp is used to minify asserts that means images js and css 
// for gulp to minify these different files it users different smaller modules for that.

// gulp-sass module is used for converting the scss file to the css file.  
// const sass = require('gulp-sass');
const sass = require('gulp-sass')(require('sass'));

// gulp-cssnano module is used for minifying the css to min version
const cssnano = require('gulp-cssnano');

// gulp-rev is the module which is used to rename the file to the file with a hash after it.

// everytime when file is send to the browser, it's hash value is changed and it is accepted by the brower as the assert
const rev = require('gulp-rev');

// used to minify js 
const uglify = require('gulp-uglify-es').default;

// used to minify images
// const imagemin = require('gulp-imagemin');

// this is used to delete the previous asserts 
const del = require('del');

// in gulp we create tasks which has to be implemented.
gulp.task('css', function(done){
    console.log('minifying css...');
    gulp.src('./assets/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./assets.css'));

     gulp.src('./assets/**/*.css')
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done();
});

// pipe is a function which is used called the submiddleware of gulp
// sass() for scss -> css
// cssnano -> minifying

// for production mode we will send these files to a public folder.

// ** means any folder and everyfolder inside it // * any file name

// changing the value of CODEIAL_ASSERT_PATH from "./asserts" to "./public/asserts" in the production mode

// menefest is a map of key value pair like pakage.json where key is the file name and the value is the original file with random hashvalue attached to it.

// simillarly as css is minified we are minifying js and images too.

gulp.task('js', function(done){
    console.log('minifying js...');
     gulp.src('./assets/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets'));
    done()
});

// gulp.task('images', function(done){
//     console.log('compressing images...');
//     gulp.src('./assets/**/*.+(png|jpg|gif|svg|jpeg)')
//     .pipe(imagemin())
//     .pipe(rev())
//     .pipe(gulp.dest('./public/assets'))
//     .pipe(rev.manifest({
//         cwd: 'public',
//         merge: true
//     }))
//     .pipe(gulp.dest('./public/assets'));
//     done();
// });


// empty the public/asserts directory
gulp.task('clean:assets', function(done){
    del.sync('./public/assets');
    done();
});

// A function or a task which will implement all the above tasks
gulp.task('build', gulp.series('clean:assets', 'css', 'js'), function(done){
    console.log('Building assets');
  

    // before running the server rum command gulp build
    done();
});