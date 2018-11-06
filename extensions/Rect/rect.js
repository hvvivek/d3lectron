class Rect
{
    constructor(config)
    {
        this.setConfig(config)
    }

    static build(config_container)
    {
        var config = {}
        config.width = $(config_container).find("input[name=width]").val()
        config.height = $(config_container).find("input[name=height]").val()
        config.x = $(config_container).find("input[name=x]").val()
        config.y = $(config_container).find("input[name=y]").val()
        config.optionalSettings = []
        var optional_inputs = $(config_container).find(".optional input")
        for(var i=0; i<optional_inputs.length; i++)
        {
            var prop = $(optional_inputs[i])
            console.log(prop)
            config.optionalSettings.push({key: prop.attr("name"), value: prop.val()})
        }
        config.parent = getActiveLayer()
        var id = randomString(5)
        config.id = id
        config.parent.addTemplate(id, new Rect(config))
        config.parent.getTemplate(id).compile()
    }

    setConfig(config)
    {
        this.config = config
        this.width = config.width
        this.height = config.height
        this.x = config.x
        this.y = config.y
        this.parent = config.parent
    }

    compile()
    {
        var canvas = d3.select("#" + this.parent.getSVGGroup())

        if(!this.canvas_group)
        {
            var random_string = randomString(20)
            canvas.append("g").attr("class", random_string)
            this.canvas_group = random_string

        }
        
        canvas = canvas.select("." + this.canvas_group)
                
        // console.log(canvas)
        canvas
            // .data(this.dataSource.data)
            // .enter()
                .append("rect")
                .attr("width",      this.getWidthFunction())
                .attr("height",      this.getHeightFunction())
                .attr("x",     this.getXFunction())
                .attr("y",     this.getYFunction())
                    
        // canvas
        //     .attr("r",      this.getRadiusFunction())
        //     .attr("cx",     this.getCxFunction())
        //     .attr("cy",     this.getCyFunction())

        // canvas
        //     .attr("fill",   this.getFillFunction())


        // canvas
        //     .exit()
        //     .remove()
        if(this.config.optionalSettings)
        {
            for(var j=0; j<this.config.optionalSettings.length; j++)
            {
                var attr = this.config.optionalSettings[j].key
                var value =  this.config.optionalSettings[j].value
                console.log(attr + " " + value)
                canvas
                    .selectAll("rect")
                    .attr(attr, value)
            }
        }
    }

    getWidthFunction()
    {
        return this.width
    }

    getHeightFunction()
    {
        return this.height
    }

    getXFunction()
    {
        return this.x
    }

    getYFunction()
    {
        return this.parent.getHeight() - this.y
    }

    // getFillFunction()
    // {
    //     return this.fill
    // }


    //Utility functions
    getDomain(feature)
    {
        var data = this.dataSource.data
        var min = d3.min(data, function(d){return parseInt(d[feature])})
        var max = d3.max(data, function(d){return parseInt(d[feature])})
        return [min, max]
    }
}



