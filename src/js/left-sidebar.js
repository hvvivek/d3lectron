$("#icon-tabs li").on("click", function(){
    if(workspace)
    {
        $("#icon-tabs .active").toggleClass("active")
        $(this).toggleClass("active")
        $("#panels .panel.active").toggleClass("active")
        $("#" + this.getAttribute("panel-id")).toggleClass("active")
        // if(!$("#" + $("#" + this.getAttribute("panel-id") + " .dropdown-title").attr("dropdown-id")).hasClass("active"))
        // {
        //     $("#" + this.getAttribute("panel-id") + " .dropdown-title").click()
        // }

        switch(this.getAttribute("panel-id"))
        {
            case "layers-panel":
                if(!$("#canvas")[0])
                {
                    $("#content").html("")
                    $("#content").append("<svg id='canvas'></svg>")
                    d3.select("#canvas")
                        .attr("width", "80%")
                        .attr("height", "45%")
                }
                if(!$("#create-layers .layers>ul>li")[0])$("#create-layers .add-btn").click()

                break;
            default:
                break;
        }
    }
})

$(".panel .dropdown-title").on("click", function()
{
    $("#" + this.getAttribute("dropdown-id")).toggleClass("active")
    if($("#" + this.getAttribute("dropdown-id")).hasClass("active"))
    {
        $( this).find(".icon").attr("src", "./assets/side-open.png")
    }
    else
    {
        $( this).find(".icon").attr("src", "./assets/side-close.png")
    }
})


