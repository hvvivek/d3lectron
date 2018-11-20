var workspace = undefined
var dataTypes = ["csv", "tsv", "json"]

var populateDataPanel = function(workspace)
{
    var folder = workspace.path
    fs.readdir(folder, (err, files) => {

        workspace.files = []
        
        for(var i=0; i<files.length; i++)
        {
            var file = files[i]
            var split = file.split(".")

            var fileData = {}
            fileData.name = file
            fileData.type = split[split.length-1]
            fileData.path = folder
            
            workspace.files.push(new WorkspaceFile(fileData))
            
        }
        
        var filesData = workspace.files.filter(function(d){return dataTypes.indexOf(d.type) >= 0})
        var filesOther = workspace.files.filter(function(d){return dataTypes.indexOf(d.type) < 0})

        d3.select("#data-sources>ul")
            .selectAll("li")
            .data(filesData)
            .enter()
                .append("li")
                .attr("data-workspace-file", function(d){return d.rString})
                .html(function(d){return '<img class="icon" src="./assets/icon.png" alt=""><img class="icon" src="./assets/icon.png" alt="">' + d.name})
                .on("click", function(d){
                    var rString = d.rString
                    var linkedFile = workspace.files.filter(function(d){return d.rString == rString})
                    if(linkedFile.length > 0)
                    {
                        linkedFile = linkedFile[0]
                        $("#content").html("")
                        linkedFile.getContent().appendTo("#content")
                    }
                })

        d3.select("#other-files>ul")
            .selectAll("li")
            .data(filesOther)
            .enter()
                .append("li")
                .attr("data-workspace-file", function(d){return d.rString})
                .html(function(d){return '<img class="icon" src="./assets/icon.png" alt=""><img class="icon" src="./assets/icon.png" alt="">' + d.name})
                .on("click", function(d){
                    var rString = d.rString
                    var linkedFile = workspace.files.filter(function(d){return d.rString == rString})
                    if(linkedFile.length > 0)
                    {
                        linkedFile = linkedFile[0]
                        $("#content").html("")
                        linkedFile.getContent().appendTo("#content")
                    }
                })
        $("#files-panel .dropdown-title").click()
        $("#other-files").attr("style", "height:" + (window.innerHeight - $("#other-files").position().top) + "px")
    })
}



var checkPath = function()
{
    if(workspace)
    {
        populateDataPanel(workspace)
        $("#files-panel button").attr("style", "display:none")
        $("#files-panel .content").attr("style", "display:block")
    }
    else
    {
        $("#files-panel button").attr("style", "display:block")
        $("#files-panel .content").attr("style", "display:none")
    }
}

$("#load-folder").on("click", function(){
    var workspacePath = dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    workspacePath = workspacePath[0]
    workspace = {}
    workspace.path = workspacePath
    checkPath()
})

checkPath()
