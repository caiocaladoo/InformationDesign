var people = [["Arturo Cabrera","M",264,93905,500,270,0,80,350,20,50,180,65,30,200,50],
["Kelly Carey","F",264,95926,450,240,0,110,130,0,100,150,30,75,165,310],
["Jae Sung Choo","M",252,95926,420,300,0,90,100,120,70,180,180,60,180,60],
["Theresa Cox","F",540,94803,435,110,360,30,475,60,120,150,100,60,240,300],
["Jonathan Fink","M",295,95765,515,100,85,20,425,5,55,185,0,40,60,150],
["Monica Fitch","F",241,94925,380,180,540,34,840,13,27,570,167,116,13,960],
["Chris Friske","M",254,95407,570,100,239,55,356,5,55,706,83,83,35,315],
["Mariah Garcia","F",254,95380,410,240,240,50,200,60,45,650,75,0,60,210],
["Tiffanie Hancock","F",420,95966,380,223,0,60,360,150,46,127,94,123,343,404],
["Paul Hebert","M",271,95616,435,435,0,30,525,120,85,150,90,90,350,260],
["Jessica Jameson","F",243,95050,580,105,0,43,722,0,27,105,87,40,35,426],
["Kevin Lloyd","M",270,95678,490,170,0,185,500,30,70,320,30,80,115,110],
["Alycia Luce","F",292,95969,420,255,120,65,690,65,35,250,30,50,115,110],
["Zachary Magno","M",301,93105,420,295,0,120,655,60,60,330,90,140,390,240],
["Filipe Marques","M",255,95926,510,290,0,30,320,50,55,50,90,0,90,90],
["Hye Jung Moon","F",292,95928,420,240,0,60,30,120,90,0,0,0,200,480],
["Ryan Oakes","M",279,95682,470,0,540,25,95,3,34,510,92,16,45,390],
["Caio Calado","M",266,95926,360,270,180,150,720,60,110,500,180,40,90,120],
["Edgar Ruiz","M",247,956363,520,300,15,262,575,5,95,720,0,85,308,55],
["Lucas Sales","M",304,95926,408,220,0,90,450,30,180,210,120,40,90,120],
["Amanda Sliva","F",245,93555,595,225,0,120,330,30,105,75,75,75,336,456],
["Marc Van Daele","M",254,95386,420,135,270,60,300,0,50,15,60,60,100,180],
["Heather Weir","F",276,92026,540,195,0,195,480,120,70,180,75,40,240,260],
["Vincent Zacha-Herthel","M",262,95616,480,275,30,200,345,0,45,300,190,80,90,495]];



var cores = ["#2c3f51", "#ec4e6e"];
var lastEdited = null;
function applyFilter(param){
    console.log(param);
    var filterType = 0;
    
    if(lastEdited != null) 
        lastEdited.attr('src', 'public/img/'+ lastEdited.attr('_notSelect')).fadeIn(800);
    
    switch(param){
        case 'sleep':
            filterType = 4;
            $('#img_sleep').attr('src', 'public/img/sleep-sel.png');
            lastEdited = $('#img_sleep');
            break;
        case 'class':
            filterType = 5;
            break;
        case 'work':
            filterType = 6;
            break;
        case 'homework':
            filterType = 7;
            break;
        case 'screen':
            filterType = 8;
            $('#img_screen').attr('src', 'public/img/screen-sel.png');
            lastEdited = $('#img_screen');
            break;
        case 'print':
            filterType = 9;
            $('#img_print').attr('src', 'public/img/print-sel.png');
            lastEdited = $('#img_print');
            break;
        case 'eating':
            filterType = 10;
            $('#img_eating').attr('src', 'public/img/eating-sel.png');
            lastEdited = $('#img_eating');
            break;
        case 'music':
            filterType = 11;
            $('#img_music').attr('src', 'public/img/music-sel.png');
            lastEdited = $('#img_music');
            break;
        case 'exercise':
            filterType = 12;
            $('#img_exercise').attr('src', 'public/img/exercises-sel.png');
            lastEdited = $('#img_exercise');
            break;
        case 'traveling':
            filterType = 13;
            $('#img_traveling').attr('src', 'public/img/traveling-sel.png');
            lastEdited = $('#img_traveling');
            break;
        case 'personal':
            $('#img_personal').attr('src', 'public/img/personal-sel.png');
            filterType = 14;
            lastEdited = $('#img_personal');
            break;
        case 'social':
            filterType = 15;
            $('#img_social').attr('src', 'public/img/personal-sel.png');
            lastEdited = $('#img_social');
            break;
    }
    
    lastEdited.fadeIn(800);
    $('#svg').empty();
    creatingDataAll(filterType);
}

function creatingDataAll(filter){
    console.log("usar o filtro: " + filter);
    var width = 1250,
        height = 610,
        padding = 1, // separation between same-color nodes
        clusterPadding = 2, // separation between different-color nodes
        maxRadius = 10;

    var n = 24, // total number of nodes
        m = 24; // number of distinct clusters

    var color = d3.scale.category10()
        .domain(d3.range(m));

    // The largest node for each cluster.
    var clusters = new Array(m);
        
    var index = 0;
    var nodes = d3.range(n).map(function() {

      var i = index,
//          r = 27,
          r = people[index][filter]/9,
          d = {cluster: i, radius: r};
      if (!clusters[i] || (r > clusters[i].radius))
          clusters[i] = d;
        
        index++;
      return d;
    });
    
//    console.log(people);
    

    // Use the pack layout to initialize node positions.
    d3.layout.pack()
        .sort(null)
        .size([width, height])
        .children(function(d) { return d.values; })
        .value(function(d) { return d.radius * d.radius; })
        .nodes({values: d3.nest()
          .key(function(d) { return d.cluster; })
          .entries(nodes)});
    
    var force = d3.layout.force()
        .nodes(nodes)
        .size([width, height])
        .gravity(.02)
        .charge(0)
        .on("tick", tick)
        .start();
    
    var svg = d3.select("body").select('svg');
        

    var node = svg.selectAll("circle")
        .data(nodes)
      .enter().append("circle")
        .attr("id", function(d,i) {
            return i;})
        .style("fill", function(d, i) {
            return people[i][1] == "M"? cores[0] : cores[1];    
        })
        .on('mouseover', function(d, i){
            var person = people[this.id];
            display(person[0], person[1], person[filter]);
        })
        .on('mouseout', function(d){
            displayHide();
        })
        .call(force.drag)
        .attr("r", function(d,i){
            return people[i][filter]/9;
        })
        

    node.transition()
        .duration(950)
        .delay(function(d, i) { return i * 5; });

    function tick(e) {
      node
          .each(cluster(100 * e.alpha * e.alpha))
          .each(collide(0.9))
          .attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    }

    // Move d to be adjacent to the cluster node.
    function cluster(alpha) {
      return function(d) {
        var cluster = clusters[d.cluster];
        if (cluster === d) return;
        var x = d.x - cluster.x,
            y = d.y - cluster.y,
            l = Math.sqrt(x * x + y * y),
            r = d.radius + cluster.radius;
        if (l != r) {
          l = (l - r) / l * alpha;
          d.x -= x *= l;
          d.y -= y *= l;
          cluster.x += x;
          cluster.y += y;
        }
      };
    }

    // Resolves collisions between d and all other circles.
    function collide(alpha) {
      var quadtree = d3.geom.quadtree(nodes);
      return function(d) {
        var r = d.radius + maxRadius + Math.max(padding, clusterPadding),
            nx1 = d.x - r,
            nx2 = d.x + r,
            ny1 = d.y - r,
            ny2 = d.y + r;
        quadtree.visit(function(quad, x1, y1, x2, y2) {
          if (quad.point && (quad.point !== d)) {
            var x = d.x - quad.point.x,
                y = d.y - quad.point.y,
                l = Math.sqrt(x * x + y * y),
                r = d.radius + quad.point.radius + (d.cluster === quad.point.cluster ? padding : clusterPadding);
            if (l < r) {
              l = (l - r) / l * alpha;
              d.x -= x *= l;
              d.y -= y *= l;
              quad.point.x += x;
              quad.point.y += y;
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        });
      };
    }
}

function display(name, type, dataValue){
    
    if(type == 'M'){
        $('#divboy').css('background-color', '#2c3f52');
        $('#displayboy').text(name + " (" + dataValue +")");
    }else{
        //for Female!
        $('#divgirl').css('background-color', '#ed4e6e');
        $('#displaygirl').text(name + " (" + dataValue +")");
    }
}

function displayHide(){
    //hiding all elements
    $('#divgirl').css('background-color', 'transparent ');
    $('#divboy').css('background-color', 'transparent ');
    $('#displaygirl').css('background-color', 'transparent ');
    $('#displaygirl').text("");
    $('#displayboy').text("");
}


window.onload = function() {
    creatingDataAll(4);
}

