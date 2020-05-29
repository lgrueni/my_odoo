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

{
	"name" : "Restaurant epson eprint",
	"version" : "0.1",
	"author" : "Louis Grüninger",
	"description" : "",
	"depends" : [
        'point_of_sale',
	],
	"init_xml" : [],
	"demo_xml" : [],
	"data" : [
			    'views/templates.xml',
                'pos_epos.xml',
			],
	'qweb':[
        'static/src/xml/pos_epson_eprint.xml',
    ],
	"installable" : True,
	"application" : True,
}