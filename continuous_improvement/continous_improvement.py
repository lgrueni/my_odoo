#Continous improvement
#Copyright (C) 2020  Louis Grüninger
#
#This program is free software: you can redistribute it and/or modify
#it under the terms of the GNU General Public License as published by
#the Free Software Foundation, either version 3 of the License, or
#(at your option) any later version.
#
#This program is distributed in the hope that it will be useful,
#but WITHOUT ANY WARRANTY; without even the implied warranty of
#MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#GNU General Public License for more details.
#
#You should have received a copy of the GNU General Public License
#along with this program.  If not, see <https://www.gnu.org/licenses/>.

from openerp import models, fields

class continous_improvement_catagory(models.Model):
    _name = 'continous.improvement.category'

    name = fields.Char('Name of the category')
    members = fields.many2many('res.users', 'rel_users_improvement', 'continous_improvement_catagory_id', 'res_users_id', string='Membres of this category')

class continous_improvement(models.Model):
    _name = 'continous_improvement'

    name = fields.Char('Subject')
    category = fields.Many2one('continous.improvement.category', string='Catégorie')
    message = fields.Text('Message')
