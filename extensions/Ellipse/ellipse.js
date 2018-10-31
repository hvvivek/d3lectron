class Ellipse
{
    constructor(config)
    {
        this.setConfig(config)
    }

    static build(config_container)
    {
        var config = {}
        config.rx = $(config_container + " input[name=rx]").val()
        config.ry = $(config_container + " input[name=ry]").val()
        config.cx = $(config_container + " input[name=cx]").val()
        config.cy = $(config_container + " input[name=cy]").val()
        config.parent = getActiveLayer()
        var id = randomString(5)
        config.id = id
        config.parent.addTemplate(id, new Ellipse(config))
        config.parent.getTemplate(id).compile()
    }

    setConfig(config)
    {
        this.config = config
        this.rx = config.rx
        this.ry = config.ry
        this.cx = config.cx
        this.cy = config.cy
        this.parent = config.parent
    }

    compile()
    {
        var plot = d3.select("#" + this.parent.getSVGGroup())

        // var xFeature = this.xFeature
        // var yFeature = this.yFeature

       
        // this.xScale = d3.scaleLinear()
        //                 .domain(getDomain(xFeature))
        //                 .range([this.left, this.width - this.right])

        // this.yScale = d3.scaleLinear()
        //                 .domain(getDomain(yFeature))
        //                 .range([this.height - this.bottom, this.top])

        var canvas = plot
                
        // console.log(canvas)
        canvas
            // .data(this.dataSource.data)
            // .enter()
                .append("ellipse")
                .attr("rx",      this.getRxFunction())
                .attr("ry",      this.getRyFunction())
                .attr("cx",     this.getCxFunction())
                .attr("cy",     this.getCyFunction())
                    
        // canvas
        //     .attr("r",      this.getRadiusFunction())
        //     .attr("cx",     this.getCxFunction())
        //     .attr("cy",     this.getCyFunction())

        // canvas
        //     .attr("fill",   this.getFillFunction())


        // canvas
        //     .exit()
        //     .remove()
    }

    getRxFunction()
    {
        return this.rx
    }

    getRyFunction()
    {
        return this.ry
    }

    getCxFunction()
    {
        return this.cx
    }

    getCyFunction()
    {
        return this.parent.getHeight() - this.cy
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



