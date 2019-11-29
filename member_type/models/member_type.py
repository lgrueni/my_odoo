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
import datetime

class member_type(orm.Model):
    _name="member.type"
    _columns={
        'create_uid': fields.many2one('res.users', 'Created by', readonly=True),
        'create_date':fields.date('Date of creation',readonly=True ),
        'write_date':fields.date('Date of modification',readonly=True ),
        'write_uid': fields.many2one('res.users', 'Last upsated by', readonly=True),
        'name':fields.char('Type of member', readonly=False),
        'cotisation':fields.float('Cotisation', readonly=False),
        'members':fields.one2many('res.partner', 'member_type', 'Members list'),
    }
member_type()