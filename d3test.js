const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const data = fetch(url)
                .then(response => response.json())
                .then(data => {
                    const w = 1000;
                    const h = 600;
                    const padding = 60;
                    const wBar = 680/275;
                    const tooltip = d3
                    .select("#barChart")
                    .append("div")
                    .attr("id", "tooltip")
                    .style("opacity", 0);


                                        

                    const svg = d3
                                .select("#barChart")
                                .append("svg")
                                .attr("width", w)
                                .attr("height", h);

                    const dataset = data.data;
                    
                    const yearDate = data.data.map(item => {
                        return new Date(item[0])
                    });
    
                    const xScaleDate = d3.scaleTime();
                    xScaleDate.domain([d3.min(yearDate), d3.max(yearDate)]);
                    xScaleDate.range([padding, w - padding]);

                    const yScale = d3.scaleLinear();
                    yScale.domain([0, d3.max(dataset, d => d[1])]);
                    yScale.range([h - padding, padding]);

                    svg.selectAll("rect")
                        .data(dataset)
                        .enter()
                        .append("rect")
                        .attr("width", wBar)
                        .attr("height", d => h - padding - yScale(d[1]))
                        .attr("x", (d, i) => xScaleDate(new Date(d[0])))
                        .attr("y", (d) => h - padding - (h - padding - yScale(d[1])))
                        .attr("fill", "green")
                        .attr("class", "bar")
                        .attr("data-date", (d) => d[0])
                        .attr("data-gdp", (d) => d[1])
                        .on("mouseover", (event, d) => {
                            tooltip.transition().duration(100).style("opacity", 1);
                            tooltip.attr("data-date", d[0]);
                            tooltip.html(`${d[0]}<br>$${d[1]} Billion`)
                        })
                        .on("mousemove", (event) => {
                            tooltip.style("left", (event.pageX-220)+"px").style("top", (event.pageY-50)+"px");
                        })
                        .on("mouseout", () => {
                            tooltip.transition().duration(100).style("opacity", 0)
                        })


                    

                    const xAxis = d3.axisBottom(xScaleDate);

                    svg.append("g")
                        .attr("id", "x-axis")
                        .attr("transform", `translate(0, ${h - padding})`)
                        .call(xAxis)

                    const yAxis = d3.axisLeft(yScale);
                        d3.select("svg")
                        .append("g")
                        .attr("id", "y-axis")
                        .attr("transform", `translate(${padding}, 0)`)
                        .call(yAxis);

                });