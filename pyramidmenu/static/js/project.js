var parent = 0

var setparent = (function(p){
    parent = p;
    var ul = $('.item-'+parent).children('ul');
    if(ul.length == 0){
        buildmenu();
    } else {
        ul.toggle();
    }
});

var buildmenu = (function(){
    var MenuCollectionObj = new MenuCollection;
    MenuCollectionObj.fetch().then(function(){
        var MenuViewObj = new MenuView({collection: MenuCollectionObj});
        MenuViewObj.render();
    });
});

var MenuCollection = Backbone.Collection.extend({
    model: Backbone.Model.extend({}),
    url: function(){ return '/xhr/startmenus/'+parent; }
});

var MenuItemView = Backbone.View.extend({
    
    className: function(){return 'item-'+this.model.id},
    
    tagName: 'li',
    
    template: _.template('<a href="/menu#<%= alias %>" onclick="setparent(<%= id %>);"><%= title %></a>'),
    
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
    
});

var MenuView = Backbone.View.extend({
    
    tagName: 'ul',
    
    //className: 'show',
    
    render: function(){
        this.collection.each(function(model){
            var MenuItemViewObj = new MenuItemView({model: model});
            this.$el.append(MenuItemViewObj.render().el)
        }, this);
        if (parent==0) {
            $('#mwr').html(this.$el);
        } else {
            $('.item-'+parent).append(this.$el);
        }   
    }
    
});