var REWRITE_EXT = [".jade", "_page_load_desktop"];

module.exports = function(app){
    app.get('/', render_get_page);
    app.get('/index', render_get_page);
    app.get('/index.jade', render_get_page);
    app.get('/index.html', render_get_page);
    app.get('/home', render_get_page);
    app.get('/demos', render_get_page);
    app.get('/experience', render_get_page);
    app.get('/skills', render_get_page);
    app.get('/blog', render_get_page);
    
    // no javascript pages
    app.get('/no_script', render_no_script);
    
    // test page loads
    app.get('/test', function default_render(req, res){
        res.render('test/index');
    });
  
    // gzipping main js file for all interfaces if the file is minified
    app.get(/.js/, function (req, res, next) {    
        if (req.url.search('min.js') > 0){
            res.header('Content-Encoding', 'gzip');
            req.url = req.url + '.gz';
        }
        
        next();
    });
}

function index_render(req, res){
    res.render(get_location(req) + "index", { title: constant.page_text.home.title });
}

function render_get_page(req, res){
    // Whatever page is passed in the system loads
    constant.to_load = req.url.substring(1).split('?')[0];//remove / and all queries

    // title is derived from constants, if this is an index page load make title blank
    var title = '';
    if (constant.page_text[constant.to_load])
        var title = constant.page_text[constant.to_load].title;
        
    var path = get_location(req) +  constant.to_load + '/index';
    if (path === '/index')
        path = 'index';
    if (path.search('/index/index') > -1)
        path = path.split('/index')[0];
        
    // if no data is found load index the right page will be loaded later
    if (get_location(req) === '')
        path = 'index';
    
    res.render(path, { title: title});
}

function render_no_script(req, res){
    var cur_page = 'home';
    var id = 0;
    
    // parse query to send correct params
    if(Object.keys(req.query).length !== 0){
        cur_page = req.query.link;
        id = req.query.id;
    }
    
    res.render("no_script", { title: constant.page_text.home.title, layout: false, cur_page: cur_page, id: id});
}

//Gets the location from determining the type of client, if no type can be found the top level location is used
function get_location(req){
    if (typeof req.params.mode !== 'undefined' && req.params.mode != null)
        return req.params.mode + "/";
    if (typeof req.query.mode !== 'undefined' && req.query.mode != null)
        return req.query.mode + "/";
    return '';
}

//ಠ_ಠ
