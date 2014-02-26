(function(jQuery) {
	jQuery.fn.ImageUploadHelper = function(method){

		function isNumeric(mixed_var) {
			return (typeof(mixed_var) === 'number' || typeof(mixed_var) === 'string') && mixed_var !== '' && !isNaN(mixed_var);
		}

		function isFunction(functionToCheck) {
			var getType = {};
			return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
		}

		function isString(data) {
			return typeof data === 'string';
		}

		if (window.File && window.FileReader && window.FileList && window.Blob) {

		} else {
			console.log('The File APIs are not fully supported in this browser.');
			return;
		}

		var methods = {
			"init": function(opts){
				var selector = this.selector;
				jQuery.each(this,function(key,element){

					if(!element)
					{
						console.log('No DOM element selected.');
						return;
					} /*else if (!this.files) {
						console.log("This browser doesn't seem to support the `files` property of file inputs.");
						return;
					}*/

					var defaults = {
							maxNumberOfFiles: 10,
							higherNumberOfFiles: function(options){},
							fileLoaded: function(file,fr){
								//console.log(fr);
							},
							cssSupport: true,
							dataFor: function(){
								return $('[data-for="'+jQuery(element).attr('name')+'"]');
							},
							fileTemplate: function(file,fr){
								/*if( typeof(jQuery(element).attr('multiple')) == 'undefined')
								{
									var _this = this;
									console.log(_this);
									var img = new Image();
									img.onload = function(){
										//if(isFunction(options.dataFor))
										//	var datafor = options.dataFor.apply(element,[]);
										//else
										//	var datafor = options.dataFor;
										//var fakeImage = jQuery('<span class="img-responsive img-thumbnail" style="width: '+img.width+'px; height: '+img.height+'px; background-image: url(\''+fr.result+'\');"></span>');
										//fakeImage.css({ position: 'relative', overflow: 'hidden' });
										//fakeImage.append(_this);
										//jQuery(datafor).append(fakeImage);
										if(options.cssSupport)
										{
											jQuery(_this).parent().addClass('img-responsive').addClass('img-thumbnail').removeClass('btn');
											jQuery(_this).parent().css({
												width: img.width+'px',
												height: img.height+'px',
												backgroundImage: "url('"+fr.result+"')"
											});
										}
									};
									img.src = fr.result;
									return '';
								}*/
								return '<img src="'+fr.result+'" alt="..." class="img-responsive img-thumbnail">';
							},
							allFileLoaded: function(files,frs){
							}
						};

					if( typeof(jQuery(element).attr('multiple')) != 'undefined')
					{
						var blobing = function(file,fr){
							options.fileLoaded.apply(element,[file,fr]);
							if(isFunction(options.dataFor))
								var datafor = options.dataFor.apply(element,[]);
							else
								var datafor = options.dataFor;

							if(isFunction(options.fileTemplate))
								var fileTemplate = options.fileTemplate.apply(element,[file,fr]);
							else
								var fileTemplate = options.fileTemplate.replace('{fr.result}',fr.result);
							jQuery(datafor).append(fileTemplate);
						};
						var beforeAppend = function(){
							if(isFunction(options.dataFor))
								var datafor = options.dataFor.apply(element,[]);
							else
								var datafor = options.dataFor;
							jQuery(datafor).empty();
						};
						var options = {};
						var change  = function(){
							if (!this.files[0]) {
								console.log("Please select a file at least!");
							} else {
								beforeAppend.apply(jQuery(selector),[]);
								var count = 0;
								var length = 0;
								var frs = [];
								var files = [];
								if(element.files.length > options.maxNumberOfFiles)
									options.higherNumberOfFiles.apply(jQuery(selector),[options]);
								else
								jQuery.each(element.files, function(key,file)
								{
									length++;
									var fr = new FileReader();
									frs.push(fr);
									files.push(file);
									fr.onload = function(){
										count++;
										blobing.apply(jQuery(selector),[file,fr]);
										if(count == length)
										{
											options.allFileLoaded.apply(jQuery(selector),[files,frs]);
										}
									};
									//function(){
										//console.log(fr.result);
									//};
									//fr.readAsText(file);
									fr.readAsDataURL(file);
								});
							}
						};

						options = element.options = $.extend({},defaults,opts);
						if(options.cssSupport)
						{
							jQuery(element).css({ display: 'block', position: 'absolute', 'font-size': '999px', bottom: 0, right: 0, cursor: jQuery(this).parent().css('cursor') }).fadeTo(0,0);
							jQuery(element).parent().css({ position: 'relative', overflow: 'hidden' });
						}
						jQuery(element).on('change',change);
						jQuery(element).trigger('change');
					}
					else
					{
						var blobing = function(file,fr){
							options.fileLoaded.apply(element,[file,fr]);
							if(isFunction(options.dataFor))
								var datafor = options.dataFor.apply(element,[]);
							else
								var datafor = options.dataFor;

							if(isFunction(options.fileTemplate))
								var fileTemplate = options.fileTemplate.apply(element,[file,fr]);
							else
								var fileTemplate = options.fileTemplate.replace('{fr.result}',fr.result);
							jQuery(datafor).append(fileTemplate);
						};
						var beforeAppend = function(){
							if(isFunction(options.dataFor))
								var datafor = options.dataFor.apply(element,[]);
							else
								var datafor = options.dataFor;
							jQuery(datafor).empty();
						};
						var options = {};
						var change  = function(){
							if (!this.files[0]) {
								console.log("Please select a file at least!");
							} else {
								beforeAppend.apply(jQuery(selector),[]);
								var count = 0;
								var length = 0;
								var frs = [];
								var files = [];
								jQuery(selector).each(function(key,_element){
									var thisInputLength = 0;
									jQuery.each(_element.files, function(key,file)
									{
										thisInputLength++;
										length++;
										var fr = new FileReader();
										frs.push(fr);
										files.push(file);
										fr.onload = function(){
											count++;
											blobing.apply(jQuery(selector),[file,fr]);
											if(count == length)
											{
												options.allFileLoaded.apply(jQuery(selector),[files,frs]);
											}
										};
										//function(){
											//console.log(fr.result);
										//};
										//fr.readAsText(file);
										fr.readAsDataURL(file);
									});
									if(thisInputLength == 0)
									{
										if(options.cssSupport)
											jQuery(element).parent().remove();
										else
											jQuery(element).remove();
									}
								});
								if(options.cssSupport)
								{
									var the = jQuery(selector).first().parent();
									if(options.maxNumberOfFiles > jQuery(selector).length)
									{
										var clone = the.clone(true,true);
										jQuery('input[type="file"]',clone).val('');
										jQuery(selector).first().parent().before(clone);
										//console.log('clone',clone);
										//console.log('origin',jQuery(selector).first().parent());
										//the.hide();
									}
									else if(options.maxNumberOfFiles < jQuery(selector).length)
										options.higherNumberOfFiles.apply(jQuery(selector),[options]);
								}
								else
								{
									var the = jQuery(selector).first();
									if(options.maxNumberOfFiles > jQuery(selector).length)
									{
										var clone = the.clone(true,true);
										jQuery('input[type="file"]',clone).val('');
										jQuery(selector).first().before(clone);
										//console.log('clone',clone);
										//console.log('origin',jQuery(selector).first());
										//the.hide();
									}
									else if(options.maxNumberOfFiles < jQuery(selector).length)
										options.higherNumberOfFiles.apply(jQuery(selector),[options]);
								}
							}
						};

						options = element.options = $.extend({},defaults,opts);
						if(options.cssSupport)
						{
							jQuery(element).css({ display: 'block', position: 'absolute', 'font-size': '999px', bottom: 0, right: 0, cursor: jQuery(this).parent().css('cursor') }).fadeTo(0,0);
							jQuery(element).parent().css({ position: 'relative', overflow: 'hidden' });
						}
						jQuery(element).on('change',change);
						jQuery(element).trigger('change');

					}

				});
			}
		}

		if ( methods[ method ] ) {
				return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ) );
		} else if ( typeof method === "object" || ! method ) {
				return methods.init.apply( this, arguments );
		} else {
				$.error( "jQuery.dialogExtend Error : Method <" + method + "> does not exist" );
		}
	};
})(jQuery);
