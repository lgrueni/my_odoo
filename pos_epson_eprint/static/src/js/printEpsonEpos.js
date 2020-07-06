openerp.pos_epson_eprint = function(instance)
{
    var module = instance.point_of_sale;
    var QWeb = instance.web.qweb;
    var SuperPosWidget = module.PosWidget.prototype;

    var printer = null;
    var ePosDev = new epson.ePOSDevice();
    var epsonTryingConnect = false;
    var epsonError = false;
    var epsonIpAddress = '';
    var epsonPort = '';
    var epsonEposId = '';

    module.PosWidget.include({
        build_widgets: function()
        {
            this._super();
            if(this.pos.config.eposPrinterIP)
            {
                //Get the IP and port of the printer set in the pos.config
                epsonIpAddress = this.pos.config.eposPrinterIP;
                epsonPort = this.pos.config.eposPrinterPort;
                epsonEposId = this.pos.config.eposPrinterId;

                //Call the connect function
                epsonConnect(epsonIpAddress, epsonPort);
            }
        },        
    }),

    module.PosWidget = module.PosWidget.extend({
        
        start: function() 
        {
			var self = this;
			SuperPosWidget.start.call(this);
			return self.pos.ready.done(function() {
				self.$('#SubmitOrderButton').click(function(){
                    //Get order infos
                    var order = self.pos.get('selectedOrder');

                    order.askPrintEpson();
                });
			});
        },
    });
    
    module.Order = module.Order.extend({
        //Function from pos.restaurant
        lineResume: function(){
            var resume = {};
            this.get('orderLines').each(function(item){
                var line = item.export_as_JSON();
                if( typeof resume[line.product_id] === 'undefined'){
                    resume[line.product_id] = line.qty;
                }else{
                    resume[line.product_id] += line.qty;
                }
            });
            return resume;
        },

        getLinesToPrint:function()
        {
            var order = this.lineResume();
            forPrint = [];
            var product;
            var categList = this.pos.config.eposCategories;

            for (id in order)
            {
                product = this.pos.db.get_product_by_id(id);
                if(categList.includes(product.pos_categ_id[0]))
                {
                    forPrint.push({
                        'name': product.display_name,
                        'quantity': order[id],
                    });
                }
            }
            return(forPrint);
        },

        askPrintEpson:function()
        {
            var self = this;
            var askExit = false;
            var dataToPrint = [];
            var generalInfos = {
                'company' : this.export_for_printing().company.name,
                'orderID' : this.export_for_printing().name,
            };

            do
            {
                if(ePosDev.isConnected())
                {
                    //Get data to print
                    dataToPrint = self.getLinesToPrint();

                    //Ask for the number and the location of the table
                    var tableNumber = window.prompt("Scan or write a number of table");
                    var tableLocation = window.prompt("Scan or write the location of the table ");

                    if (!isNaN(tableNumber) && tableLocation)
                    {
                        generalInfos['tableNumber'] = tableNumber;
                        generalInfos['tableLocation'] = tableLocation;
                        
                        this.printEpson(dataToPrint, generalInfos);
                        askExit = true;
                    }
                    else
                    {
                        if(!confirm("Error with number and location\nDo you want to retry?"))
                            askExit = true;
                    }
                }
                else
                {
                    if(!epsonTryingConnect)
                    {
                        if(confirm("Epson disconnect, try to reconnect?"))
                        {
                            epsonConnect();
                            askExit = true;
                        }
                        else
                        {
                            askExit = true;
                        }
                    }
                    else
                    {
                        alert("System is trying to connect the printer");
                        askExit = true;
                    }
                }
            }
            while(askExit == false);
        },

        printEpson:function(dataToPrint, generalInfos)
        {
            //Get date and hour
            var d = new Date();
            var date = d.getDate() +'.'+(d.getMonth()+1)+'.'+d.getFullYear();
            var hour = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
            
            epsonPrinter.addLayout(epsonPrinter.LAYOUT_RECEIPT, 800, 0, 0, 0, 0, 0);
            epsonPrinter.addTextAlign(epsonPrinter.ALIGN_LEFT);
            epsonPrinter.addText(date + '\n' + hour);
            epsonPrinter.addFeedLine(1);
            epsonPrinter.addTextAlign(epsonPrinter.ALIGN_CENTER);
            epsonPrinter.addTextStyle(true, false, false, epsonPrinter.COLOR_1);
            epsonPrinter.addTextSize(2, 2);
            epsonPrinter.addText('  TABLE N°' + generalInfos.tableNumber + '  \n');
            epsonPrinter.addText('  ' + generalInfos.tableLocation + '  \n');
            epsonPrinter.addTextSize(1, 2);
            epsonPrinter.addTextStyle(false, false, false, epsonPrinter.COLOR_1);
            epsonPrinter.addTextAlign(epsonPrinter.ALIGN_LEFT);
            epsonPrinter.addText('==================\n');
            epsonPrinter.addFeedLine(1);
            dataToPrint.forEach(element => {
                epsonPrinter.addText(element.quantity);
                epsonPrinter.addTextPosition(50);
                epsonPrinter.addText(element.name + '\n');
                epsonPrinter.addFeedLine(1);
            });
            epsonPrinter.addText('==================\n');
            epsonPrinter.addTextSize(1, 1);
            epsonPrinter.addText(generalInfos.company + '\n');
            epsonPrinter.addTextAlign(epsonPrinter.ALIGN_RIGHT);
            epsonPrinter.addText(generalInfos.orderID + '\n');
            epsonPrinter.addFeedLine(2);
            epsonPrinter.addCut(epsonPrinter.CUT_FEED);
            epsonPrinter.send();
        },
    });

    function epsonConnect(ipAddress, port)
    {
        var self = this;

        ePosDev.disconnect();

        epsonTryingConnect = true;
        epsonError = false;

        ePosDev.connect(ipAddress, port, callback);
    }

    function callback(data)
    {
        var self = this;

        if(data == 'OK' || data == 'SSL_CONNECT_OK') 
        {
            ePosDev.createDevice(epsonEposId, ePosDev.DEVICE_TYPE_PRINTER, {'crypto':false, 'buffer':false}, cbCreateDevice_printer);
        } 
        else 
        {
            alert("Failed to connect to Epson\nError code: " + data);
            epsonTryingConnect = false;
            epsonError = true;
        }
    }

    function cbCreateDevice_printer(devobj, retcode)
    {
        if( retcode == 'OK' ) 
        {
            epsonPrinter = devobj;
            epsonPrinter.timeout = 60000;
            epsonTryingConnect = false;
            epsonPrinter.onreceive = function (success, code) 
            {
                if(code != 0)
                    alert("Error from epson:\n" + code);
            };
        } 
        else 
        {
            alert("Failed to connect to Epson\nError code: " + retcode);
            epsonTryingConnect = false;
            epsonError = true;
        }
    }
}