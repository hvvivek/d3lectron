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
    var manifest = JSON.parse(fs.readFileSync(extensions_path + extension + "/package.json", 'utf8'));
    manifest.full_path = "." + extensions_path + extension + "/"
    // manifest.class_path = "." + extensions_path + extension + "/" + manifest.main
    // extension_details.functions_path = "." + extensions_path + extension + "/functions.js"

    for(var j=0; j<manifest.scripts.length; j++){
        var script = manifest.scripts[j]
        script = "." + extensions_path + extension + "/" + script
        $.loadScript(script, function(){
            console.log("Loading Extension " + manifest.name + " Script " + j + "/" + manifest.scripts.length)
        });
    }

    
    extensions[manifest.name] = {}
    extensions[manifest.name].icon = manifest.full_path + manifest.icon
    console.log(extensions[manifest.name].icon)

    extensions[manifest.name].path = manifest.full_path
    extensions[manifest.name].getView = function(path)
    {
        console.log(this)
        var container = $("<div></div>")
        var html = $("<div></div>")
        container.append(html)
        container.append("<link rel='stylesheet' href='"+ path +"style.css'>")
        html.load(path + "index.html", function()
        {
        })
        // console.log(view[0].innerHTML)
        return container
    }
}
