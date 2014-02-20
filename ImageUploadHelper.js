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
						fileLoaded: function(fr){
							//console.log(fr);
						},
						cssSupport: true,
						dataFor: function(){
							return $('[data-for="'+jQuery(element).attr('name')+'"]');
						},
						fileTemplate: function(fr){
							return '<img src="'+fr.result+'" alt="..." class="img-responsive img-thumbnail">';
						},
						allFileLoaded: function(frs){
						}
					};
					var blobing = function(fr){
						options.fileLoaded(fr);
						if(isFunction(options.dataFor))
							var datafor = options.dataFor.apply(element,[]);
						else
							var datafor = options.dataFor;

						if(isFunction(options.fileTemplate))
							var fileTemplate = options.fileTemplate.apply(element,[fr]);
						else
							var fileTemplate = options.fileTemplatefileTemplate.replace('{fr.result}',fr.result);
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
						var _this =element;
						if (!this.files[0]) {
							console.log("Please select a file at least!");
						} else {
							beforeAppend.apply(_this,[]);
							var count = 0;
							var length = 0;
							var frs = [];
							jQuery.each(element.files, function(key,file)
							{
								length++;
								var fr = new FileReader();
								frs.push(fr);
								fr.onload = function(){
									count++;
									blobing.apply(_this,[fr]);
									if(count == length)
									{
										options.allFileLoaded.apply(_this,[frs]);
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
