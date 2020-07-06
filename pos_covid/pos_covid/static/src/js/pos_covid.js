ecr = {};

openerp.pos_covid = function(instance)
{
    var module = instance.point_of_sale;
    var QWeb = instance.web.qweb;
    var SuperPosWidget = module.PosWidget.prototype;

    module.PosWidget.include({
        build_widgets: function()
        {
            var self = this;
            this._super();
        },

        close: function()
        {
            this._super();
        },
        
        
    });

    module.Order = module.Order.extend({
        askCovidPrint:function()
        {
            var order = this.lineResume();
            var categList = this.pos.config.covid_categories;

            for (id in order)
            {
                product = this.pos.db.get_product_by_id(id);
                if(categList.includes(product.pos_categ_id[0]))
                {
                    return true;
                }
            }
            return false;
        },
    });

    module.PaymentScreenWidget.include({
        validate_order: function(line){
            var self = this;
            var order = self.pos.get('selectedOrder');

            if(order.askCovidPrint())
            {
                this.pos.proxy.print_receipt(QWeb.render('covidReceipt',{
                    receipt: {}, widget: this,
                }));
            }
            this._super();            
        },
    });
}