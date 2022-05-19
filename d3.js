
const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const data = fetch(url)
                .then(response => response.json())
                .then(data => {
                    const w = 800;
                    const h = 600;
                    const padding = 60;
                    const wBar = 680/275    ;

                    const svg = d3
                                .select("#barChart")
                                .append("svg")
                                .attr("width", w)
                                .attr("height", h);

                    const dataset = data.data;
                    const test = data.data.map(item => {
                        return (parseFloat(item[0]))
                    });
                    console.log(test)

                    const xScale = d3.scaleLinear();
                    xScale.domain([d3.min(dataset, d => parseFloat(d[0])), d3.max(dataset, d => parseFloat(d[0]))]);
                    xScale.range([padding, w - padding]);

                    const yScale = d3.scaleLinear();
                    yScale.domain([0, d3.max(dataset, d => d[1])]);
                    yScale.range([h - padding, padding]);

                    svg.selectAll("rect")
                        .data(dataset)
                        .enter()
                        .append("rect")
                        .attr("width", wBar)
                        .attr("height", d => h - padding - yScale(d[1]))
                        .attr("x", (d, i) => { return xScale(parseFloat(d[0]))})
                        .attr("y", (d) => h - padding - (h - padding - yScale(d[1])))
                        .attr("fill", "navy")
                        .attr("class", "bar")
                        .attr("data-date", (d) => d[0])
                        .attr("data-gdp", (d) => d[1])
                        .append("title")
                        .attr("id", "tooltip")
                        .text((d) => d[0] + " " + d[1])

                    

                    const xAxis = d3.axisBottom(xScale);

                    svg.append("g")
                        .attr("id", "x-axis")
                        .attr("transform", `translate(0, ${h - padding})`)
                        .call(xAxis)

                    const yAxis = d3.axisLeft(yScale);

                    svg.append("g")
                        .attr("id", "y-axis")
                        .attr("transform", `translate(${padding}, 0)`)
                        .call(yAxis);

                });





