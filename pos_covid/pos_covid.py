from openerp import models, fields

class pos_config(models.Model):
    _inherit = 'pos.config'

    covid_categories = fields.Many2many('pos.category','rel_categories_covid','pos_config_id','pos_category_id', string='Categories to print')
