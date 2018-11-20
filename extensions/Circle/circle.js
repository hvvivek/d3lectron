class Circle
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
        config.r = $(config_container).find("input[name=r]").val()
        config.cx = $(config_container).find("input[name=cx]").val()
        config.cy = $(config_container).find("input[name=cy]").val()
        config.optionalSettings = []
        var optional_inputs = $(config_container).find(".optional input")
        for(var i=0; i<optional_inputs.length; i++)
        {
            var prop = $(optional_inputs[i])
            // console.log(prop)
            config.optionalSettings.push({key: prop.attr("name"), value: prop.val()})
        }
        config.parent = getActiveLayer()

        // var id = randomString(5)
        // config.id = $(config_container).find("input[name=id]").val()
        config.canvas = getActiveLayer().getTemplate(workspace.activeTemplateId).getSVGGroup()

        config.parent.getTemplate(workspace.activeTemplateId).compile(Circle, config)
    }

    setConfig(config)
    {
        this.config = config
        this.r = config.r
        this.cx = config.cx
        this.cy = config.cy
        this.parent = config.parent
        this.canvas = config.canvas
        this.width = parseInt($("#canvas").attr("width"))
        this.height = parseInt($("#canvas").attr("height"))
    }

    compile()
    {
        var canvas = d3.select("#" + this.canvas)
        
        console.log(this.canvas)
        // console.log(this.parent.getSVGGroup())
        if(!this.canvas_group)
        {
            var random_string = randomString(20)
            canvas.append("g").attr("id", random_string)
            this.canvas_group = random_string

        }
        
        canvas = canvas.select("#" + this.canvas_group)
        
                
        console.log(canvas)
        if(!this.config.dataConnect)
        {
        canvas
            // .data(this.dataSource.data)
            // .enter()
                .append("circle")
                .attr("r",      this.getRadiusFunction())
                .attr("cx",     this.getCxFunction())
                .attr("cy",     this.getCyFunction())
        }
        else
        {
            var xFeature = this.config.cx
            var yFeature = this.config.cy

        
            this.xScale = d3.scaleLinear()
                            .domain(this.getDomain(xFeature))
                            .range([0, this.width])

            this.yScale = d3.scaleLinear()
                            .domain(this.getDomain(yFeature))
                            .range([this.height, 0])
                            
            var plot = canvas
                .selectAll("circle")
                .data(this.config.dataSource.data)

            plot
                .enter()
                    .append("circle")
                    .attr("r",      this.getRadiusFunction())
                    .attr("cx",     this.getCxFunction())
                    .attr("cy",     this.getCyFunction())
            
            plot
                .attr("r",      this.getRadiusFunction())
                .attr("cx",     this.getCxFunction())
                .attr("cy",     this.getCyFunction())

            plot.exit().transition()
            .style("opacity", 0).remove()

            
        }
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
                // console.log(attr + " " + value)
                canvas
                    .selectAll("circle")
                    .attr(attr, value)
            }
        }
    }

    getRadiusFunction()
    {
        // console.log(this.r)
        if(this.config.dataConnect && !isValidLength(this.config.r))
        {
            var feature = this.r
            return function(d){ return d[feature]}
        }
        else
        {
            return this.r
        }
    }

    getCxFunction()
    {
        var xScale = this.xScale
        if(this.config.dataConnect && !isValidLength(this.config.cx))
        {
            var feature = this.config.cx
            return function(d){ return xScale(d[feature])}
        }
        else
        {
            return this.config.cx
        }
        // return this.cx
    }

    getCyFunction()
    {
        var yScale = this.yScale
        if(this.config.dataConnect && !isValidLength(this.config.cy))
        {
            var feature = this.config.cy
            return function(d){ return yScale(d[feature])}
        }
        else
        {
            return this.config.cy
        }
        // return this.parent.getHeight() - this.cy
    }

    getFillFunction()
    {
        return this.fill
    }


    //Utility functions
    getDomain(feature)
    {
        var data = this.config.dataSource.data
        var min = d3.min(data, function(d){return parseInt(d[feature])})
        var max = d3.max(data, function(d){return parseInt(d[feature])})
        return [min, max]
    }
}



