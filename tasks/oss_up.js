/*
 * grunt-oss-up
 * https://github.com/marshalYuan/grun-oss-up
 *
 * Copyright (c) 2014 marshalYuan
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Please see the Grunt documentation for more information regarding task
	// creation: http://gruntjs.com/creating-tasks
	var OSS = require('oss-client'),
		async = require('async'),
		path = require('path');
		
	grunt.registerMultiTask('oss', 'A grunt tool for uploading static file to aliyun oss.', function() {
		var done = this.async(); 
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			/**
             * @name objectGen --return a aliyun oss object name 
			 *					  default return grunt task files' dest + files' name
             * @param dest  --grunt task files' dest
             * @param src  --grunt task files' src
             */
			objectGen: function(dest, src){
				return [dest, path.basename(src)].join('\/');
			}
		});
		
		if(!options.accessKeyId || !options.accessKeySecret || !options.bucket){
			grunt.fail.fatal('accessKeyId, accessKeySecret and bucket are all required!');
		}
		var option = {
				accessKeyId: options.accessKeyId,
				accessKeySecret: options.accessKeySecret
			};
		//creat a new oss-client
		var	oss = new OSS.OssClient(option);
		// Iterate over all specified file groups.
		this.files.forEach(function(f) {
			// Concat specified files.
			var objects = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
					grunt.log.warn('Source file "' + filepath + '" not found.');
					return false;
				} else {
					return true;
				}
			}).map(function(filepath) {
				// return an oss object.
				return {
					bucket: options.bucket,
					object: options.objectGen(f.dest, filepath),
					srcFile: filepath
				};

			});
			var uploadTasks = [];
			objects.forEach(function(o) {
				
				uploadTasks.push(makeUploadTask(o));	
			});
			grunt.log.ok('Start uploading files.')
			async.series(uploadTasks, function(error, results) {
				if (err) {
					grunt.fail.fatal("uploadError:"+err);
				} else {
					grunt.log.ok('All files has uploaded yet!');
				}
				done(error, results);
			});
			/**
			 * @name makeUploadTask  -- make task for async
			 * @param object  --aliyun oss object
			 */
			function makeUploadTask(object) {
				return function(callback) {
					oss.putObject(object, function (error, result) {
						callback(error, result);
					});
				}
			}
			
		});
	});
};
