# grunt-oss-up

> A grunt tool for uploading static file to aliyun oss.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-oss-up --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-oss-up');
```

## The "oss" task

### Overview
In your project's Gruntfile, add a section named `oss_up` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  oss: {
    options: {
      // Task-specific options go here.
    },
    files: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options


#### options.accessKeyId
Type: `String`

A string value that is your aliyun oss accessKeyId.

#### options.accessKeySecret
Type: `String`

A string value that is your aliyun oss accessKeySecret.

#### options.bucket
Type: `String`

A string value that is your aliyun oss bucket.

#### options.objectGen
Type: `Function`
Default: 
```js
function(dest, src){
	return [dest, path.basename(src)].join('\/');
}
```
A function that return a oss objectName by dest and src. Default return grunt task files' dest + files' name.

### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  oss: {
	upload:{
	  options: {
		accessKeyId: your_accessKeyId,
		accessKeySecret: your_accessKeySecret,
		bucket: your_bucket_name
	  },
	  files: {
	    'myoss/js': ['src/main.js', 'src/other.js', 'src/js/*.js']
	  }
	}
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
