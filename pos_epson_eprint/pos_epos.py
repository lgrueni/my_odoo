# -*- coding: utf-8 -*-

#Print orders on remote epson receipt printer with Epos
#Module inspired from pos_restaurant
#Copyright (C) 2020  Louis Grüninger

#This program is free software: you can redistribute it and/or modify
#it under the terms of the GNU General Public License as published by
#the Free Software Foundation, either version 3 of the License, or
#(at your option) any later version.

#This program is distributed in the hope that it will be useful,
#but WITHOUT ANY WARRANTY; without even the implied warranty of
#MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#GNU General Public License for more details.

#You should have received a copy of the GNU General Public License
#along with this program.  If not, see <https://www.gnu.org/licenses/>.

from openerp import models, fields

class pos_config(models.Model):
    _inherit = 'pos.config'

    eposPrinterIP = fields.Char('Epos printer IP', help='Enter the IP address of the EPOS printer')
    eposPrinterPort = fields.Integer('Epos printer port', help='Port of the printer (8008 or 8043)')
    eposPrinterId = fields.Char('Epos ID')
    eposCategories = fields.Many2many('pos.category','rel_categories_table','pos_config_id','pos_category_id', string='Categories to print')

    _defaults = {
        'eposPrinterPort': 8043,
    }