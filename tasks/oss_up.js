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
		chalk = require('chalk'),
		path = require('path'),
		fs = require('fs');
	grunt.registerMultiTask('oss', 'A grunt tool for uploading static file to aliyun oss.', function() {
		// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({
			objectGen: function(dest, src){
				return path.join(dest, src);
			}
		});
		
		if(!optiions.accessKeyId || !options.accessKeySecret || !options.bucket){
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
			var src = f.src.filter(function(filepath) {
				// Warn on and remove invalid source files (if nonull was set).
				if (!grunt.file.exists(filepath)) {
				  grunt.log.warn('Source file "' + filepath + '" not found.');
				  return false;
				} else {
				  return true;
				}
			}).map(function(filepath) {
				// Read file source.
				var stream = fs.createReadStream(filepath);
				oss.putObject({
					bucket: options.bucket,
					object: options.objectGen(f.dest, filepath),
					srcFile: input,
					contentLength: fs.statSync(filepath).size
				}, function (error, result) {
					if(!!error){
						grunt.fail.fatal(error');
					}else if(result.code == 200) {
						// Print a success message.
						grunt.log.writeln(filepath + ' has been uploaded');
					}
				});
			});
		});
	});
};
