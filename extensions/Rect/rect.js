class Rect
{
    constructor(config)
    {
        this.setConfig(config)
    }

    static build(config_container)
    {
        var config = {}
        config.dataConnect = $(config_container).find("input[name=connect_data]")[0].checked
        if(config.dataConnect)
        {
            config.dataSource = $(config_container).find("input[name=data]").val()
            console.log(config.dataSource)
            config.dataSource = workspace.data_sources[config.dataSource]
            console.log(config.dataSource)
        }
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

        // var id = randomString(5)
        // config.id = $(config_container).find("input[name=id]").val()
        config.canvas = getActiveLayer().getTemplate(workspace.activeTemplateId).getSVGGroup()

        config.parent.getTemplate(workspace.activeTemplateId).compile(Rect, config)
    }

    setConfig(config)
    {
        this.config = config
        this.width = config.width
        this.height = config.height
        this.canvas = config.canvas
        this.x = config.x
        this.y = config.y
        this.parent = config.parent
        this.width = parseInt($("#canvas").attr("width"))
        this.height = parseInt($("#canvas").attr("height"))
    }

    compile()
    {
        var canvas = d3.select("#" + this.canvas)

        if(!this.canvas_group)
        {
            var random_string = randomString(20)
            canvas.append("g").attr("id", random_string)
            this.canvas_group = random_string

        }
        
        canvas = canvas.select("#" + this.canvas_group)
        console.log("#" + this.canvas_group)
        if(!this.config.dataConnect)
        {
            canvas
            // .data(this.dataSource.data)
            // .enter()
                .append("rect")
                .attr("width",      this.getWidthFunction())
                .attr("height",      this.getHeightFunction())
                .attr("x",     this.getXFunction())
                .attr("y",     this.getYFunction())
        }
        else
        {
            var xFeature = this.config.x
            var yFeature = this.config.y

        
            this.xScale = d3.scaleLinear()
                            .domain(this.getDomain(xFeature))
                            .range([0, this.width])

            this.yScale = d3.scaleLinear()
                            .domain(this.getDomain(yFeature))
                            .range([this.height, 0])
                            
            var plot = canvas
                .selectAll("rect")
                .data(this.config.dataSource.data)

            plot
                .enter()
                    .append("rect")
                    .attr("width",      this.getWidthFunction())
                    .attr("height",      this.getHeightFunction())
                    .attr("x",     this.getXFunction())
                    .attr("y",     this.getYFunction())
            
            plot
                .attr("width",      this.getWidthFunction())
                .attr("height",      this.getHeightFunction())
                .attr("x",     this.getXFunction())
                .attr("y",     this.getYFunction())

            plot.exit().transition()
            .style("opacity", 0).remove()



        }
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
        var xScale = this.xScale
        if(this.config.dataConnect && !isValidLength(this.config.width))
        {
            var feature = this.config.width
            return function(d){ return xScale(d[feature])}
        }
        else
        {
            return this.config.width
        }

    }

    getHeightFunction()
    {
        var yScale = this.yScale
        if(this.config.dataConnect && !isValidLength(this.config.height))
        {
            console.log(this.config.height)

            var feature = this.config.height
            return function(d){ return yScale(d[feature])}
        }
        else
        {
            return this.config.height
        }
    }

    getXFunction()
    {
        var xScale = this.xScale
        if(this.config.dataConnect && !isValidLength(this.config.x))
        {
            var feature = this.config.x
            return function(d){ return xScale(d[feature])}
        }
        else
        {
            return this.config.x
        }

    }

    getYFunction()
    {
        var yScale = this.yScale
        if(this.config.dataConnect && !isValidLength(this.config.y))
        {
            var feature = this.config.y
            return function(d){ return yScale(d[feature])}
        }
        else
        {
            return this.config.y
        }

    }

    // getFillFunction()
    // {
    //     return this.fill
    // }


    //Utility functions
    getDomain(feature)
    {
        var data = this.config.dataSource.data
        var min = d3.min(data, function(d){return parseInt(d[feature])})
        var max = d3.max(data, function(d){return parseInt(d[feature])})
        return [min, max]
    }
}



