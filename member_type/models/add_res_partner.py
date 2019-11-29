# -*- coding: utf-8 -*-
##############################################################################
#
#    Copyright (C) 2013 EIA-FR (https://eia-fr.ch/)
#    Copyright (C) 2014 The DoMo Team (https://launchpad.net/~domo)
#    Louis Grüninger
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################

from openerp.osv import orm, fields
from openerp import api
import datetime

class res_partner(orm.Model):
    _inherit = 'res.partner'
    _columns={
        'member_type':fields.many2one('member.type', 'Type of member'),
        'member_cotisation':fields.float('Cotisation'),
    }

    @api.onchange('member_type')
    def _onchange_member_price(self):
        for rec in self:
            if rec.member_type:
                rec.member_cotisation=rec.member_type.cotisation

    @api.onchange('member_cotisation')
    def _onchange_member_cotisation(self):
        for rec in self:
            if rec.member_type:
                rec.member_cotisation=rec.member_type.cotisation

res_partner()