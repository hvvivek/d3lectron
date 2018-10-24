$.loadScript = function (url, callback) {
    $.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}

var extensions = {}

function getDirectories(path) {
    return fs.readdirSync(path).filter(function (file) {
      return fs.statSync(path+'/'+file).isDirectory();
    });
}

var extensions_path = "./extensions/"
var installed_extensions = getDirectories(extensions_path)
// extensions.extensions = {}

for(var i=0; i<installed_extensions.length; i++)
{
    var extension = installed_extensions[i]
    var extension_details = JSON.parse(fs.readFileSync(extensions_path + extension + "/package.json", 'utf8'));
    extension_details.full_path = "." + extensions_path + extension + "/"
    extension_details.class_path = "." + extensions_path + extension + "/" + extension_details.main
    extension_details.functions_path = "." + extensions_path + extension + "/functions.js"
    extensions[extension_details.name] = extension_details

    console.log(extension_details.class_path)
    $.loadScript(extension_details.class_path, function(){
        console.log("Loaded Extension" + extension_details.name)
    });

    $.loadScript(extension_details.functions_path, function(){
        console.log("Loaded Extension Functions" + extension_details.name)
    });
}
