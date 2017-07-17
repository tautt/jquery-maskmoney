module.exports = function (grunt) {
    "use strict";

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        meta: {
            banner: "/*\n" +
            " *  <%= pkg.title || pkg.name %> - v<%= pkg.version %>\n" +
            " *  <%= pkg.description %>\n" +
            " *  <%= pkg.homepage %>\n" +
            " *\n" +
            " *  Made by <%= pkg.author.name %>\n" +
            " *  Under <%= pkg.license %> License\n" +
            " */\n"
        },
        jshint: {
            all: ["Gruntfile.js", "src/**/*.js", "test/**/*.js", "!test/util.js"],
            options: {
                jshintrc: true
            }
        },
        concat: {
            dist: {
                src: ["src/jquery.maskMoney.js"],
                dest: "dist/jquery.maskMoney.js"
            },
            options: {
                banner: "<%= meta.banner %>"
            }
        },
        uglify: {
            options: {
                banner: "<%= meta.banner %>",
                mangle: {
                    except: ["jQuery", "$"]
                }
            },
            build: {
                files: [
					{ src: "src/jquery.maskMoney.js", dest: "dist/jquery.maskMoney.min.js" },
                ]
            }
        },
        qunit: {
		  all: {
			options: {
			  urls: ["http://localhost:9000/test/<%= pkg.name %>.html"],
			  page : {
				viewportSize : { width: 1280, height: 800 }
			  }
			}
		  }
		},
        
        jquerymanifest: {
            options: {
                source: grunt.file.readJSON("package.json"),
                overrides: {
                    "name": "maskMoney",
                    "title": "jQuery maskMoney",
                    "download": "https://raw.github.com/plentz/jquery-maskmoney/master/dist/jquery.maskMoney.min.js",
                    "docs": "http://github.com/plentz/jquery-maskmoney",
                    "demo": "http://plentz.github.com/jquery-maskmoney",
                    "keywords": ["form", "input", "mask", "money"]
                }
            }
        },
        watch: {
            files: ["test/*.html", "test/*.js", "src/*.js"],
            tasks: ["jshint", "qunit"]
        },
		connect: {
		  tests: {
			options: {
			  hostname: "*",
			  port: 9000
			}
		  }
		},
        "saucelabs-qunit": {
            all: {
                options: {
                    urls: ["http://localhost:9000/test/jquery-maskmoney.html"],
                    build: process.env.TRAVIS_JOB_ID,
					testname: "Sauce Unit Test for maskMoney",
					framework: "qunit",
                    browsers: [
                      // iOS
                      {
                          browserName: "iphone",
                          platform: "OS X 10.9",
                          version: "7.1"
                      },
					  {
                          browserName: "iphone",
                          platform: "OS X 10.9",
                          version: "5.1"
                      },
					  {
                          browserName: "iphone",
                          platform: "OS X 10.9",
                          version: "6.0"
                      },
					  
                      {
                          browserName: "ipad",
                          platform: "OS X 10.9",
                          version: "7.1"
                      },
                      // Android
                      {
                          browserName: "android",
                          platform: "Linux",
                          version: "4.3"
                      },
                      // OS X
                      {
                          browserName: "safari",
                          platform: "OS X 10.9",
                          version: "7"
                      },
                      {
                          browserName: "safari",
                          platform: "OS X 10.8",
                          version: "6"
                      },
                      {
                          browserName: "firefox",
                          platform: "OS X 10.9",
                          version: "53"
                      },
                      // Windows
                      {
                          browserName: "internet explorer",
                          platform: "Windows 8.1",
                          version: "11"
                      },
                      {
                          browserName: "internet explorer",
                          platform: "Windows 8",
                          version: "10"
                      },
                      {
                          browserName: "internet explorer",
                          platform: "Windows 7",
                          version: "11"
                      },
                      {
                          browserName: "internet explorer",
                          platform: "Windows 7",
                          version: "10"
                      },
                      {
                          browserName: "internet explorer",
                          platform: "Windows 7",
                          version: "9"
                      },
                      {
                          browserName: "firefox",
                          platform: "Windows 7",
                          version: "53"
                      },
                      {
                          browserName: "chrome",
                          platform: "Windows 7",
                          version: "34"
                      },
                      // Linux
                      {
                          browserName: "firefox",
                          platform: "Linux",
                          version: "53"
                      }
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-concat");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-jquerymanifest");
    grunt.loadNpmTasks("grunt-contrib-qunit");
    grunt.loadNpmTasks("grunt-contrib-watch");	
	grunt.loadNpmTasks("grunt-contrib-connect");
	grunt.loadNpmTasks("grunt-saucelabs");	

    grunt.registerTask("test", ["connect", "saucelabs-qunit"]);	
    grunt.registerTask("ci", ["jshint", "connect", "qunit", "saucelabs-qunit"]);
    grunt.registerTask("default", ["jshint", "connect", "qunit", "concat", "uglify", "jquerymanifest"]);
};
