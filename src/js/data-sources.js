class DataSource
{
    constructor(name, args)
    {
        this.full_path = args.full_path
        this.type = args.type
        this.name = name
        var dataSource = this
        d3[this.type](this.full_path).then(
            function(d)
            {
                dataSource.data = d
                dataSource.features = d3.keys(d[0])
            }
        )
    }
}