//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class Main extends egret.DisplayObjectContainer {

    /**
     * 加载进度界面
     * Process interface loading
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event:egret.Event) {
        //设置加载进度界面
        //Config to load process interface
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);

        //初始化Resource资源加载库
        //initiate Resource loading library
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    }

    /**
     * preload资源组加载完成
     * Preload resource group is loaded
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.createGameScene();
        }
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onItemLoadError(event:RES.ResourceEvent):void {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    }

    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //Ignore the loading failed projects
        this.onResourceLoadComplete(event);
    }

    /**
     * preload资源组加载进度
     * Loading process of preload resource group
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    }

    private textfield:egret.TextField;

    /**
     * 创建游戏场景
     * Create a game scene
     */
    private createGameScene():void {

        var page1 = new egret.DisplayObjectContainer();
        var stageW:number = this.stage.stageWidth;
        var stageH:number = this.stage.stageHeight;
        this.addChild(page1);
        page1.width = stageW;
        page1.height = stageH;

        var page2 = new egret.DisplayObjectContainer();
        this.addChild(page2);
        page2.width = stageW;
        page2.height = stageH;

        var page3 = new egret.DisplayObjectContainer();
        this.addChild(page3);
        page3.width = stageW;
        page3.height = stageH;

//第一页
        var sky1:egret.Bitmap = this.createBitmapByName("background1_jpg");
        page1.addChild(sky1);
        sky1.width = stageW;
        sky1.height = stageH;

        var rotarysky1:egret.Bitmap = this.createBitmapByName("1_png");
        page1.addChild(rotarysky1);
        rotarysky1.anchorOffsetX = rotarysky1.width / 2;  
        rotarysky1.anchorOffsetY = rotarysky1.height / 2;     
        rotarysky1.x = stageW / 2;
        rotarysky1.y = rotarysky1.height / 2 + 20;

        var topMask1 = new egret.Shape();
        topMask1.graphics.beginFill(0xFFFFFFF, 0.1);
        topMask1.graphics.drawRect(0, 0, stageW, 320);
        topMask1.graphics.endFill();
        topMask1.y = 550;
        page1.addChild(topMask1);

        var colorLabel1 = new egret.TextField();
        colorLabel1.textColor = 0xFFFFFF;
        colorLabel1.width = stageW;
        colorLabel1.textAlign = egret.HorizontalAlign.CENTER;
        colorLabel1.fontFamily = "SimHei";
        colorLabel1.text = "个人简历";
        colorLabel1.size = 96;
        colorLabel1.x = 0;
        colorLabel1.y = 600;
        page1.addChild(colorLabel1);

        var colorLabel2 = new egret.TextField();
        colorLabel2.textColor = 0xFFFFFF;
        colorLabel2.width = stageW;
        colorLabel2.textAlign = egret.HorizontalAlign.CENTER;
        colorLabel2.fontFamily = "SimHei";
        colorLabel2.text = "徐元超";
        colorLabel2.size = 64;
        colorLabel2.x = 0;
        colorLabel2.y = 730;
        page1.addChild(colorLabel2);        

        var colorLabel3 = new egret.TextField();
        colorLabel3.textColor = 0x00ff0c;
        colorLabel3.width = stageW;
        colorLabel3.textAlign = egret.HorizontalAlign.CENTER;
        colorLabel3.fontFamily = "SimHei";
        colorLabel3.text = "请向下翻阅";
        colorLabel3.size = 28;
        colorLabel3.x = 0;
        colorLabel3.y = 820;
        page1.addChild(colorLabel3); 

        this.MovePages(2, this);

    //旋转
        var rotation1 : Function = function() {
            var circle1 = egret.Tween.get(rotarysky1);
            circle1.to( {rotation: -360}, 50000 );    
            circle1.call(rotation1, 50000);
        }
        rotation1();

    //闪烁
        var flicker:Function = function() {
            var flicker_colorLabel3 = egret.Tween.get(colorLabel3);
            flicker_colorLabel3.to( {"alpha": 1}, 500 );
            flicker_colorLabel3.wait(300);
            flicker_colorLabel3.to( {"alpha": 0}, 500 );
            flicker_colorLabel3.call(flicker, self);
        }
        flicker();


//第二页
        var sky2:egret.Bitmap = this.createBitmapByName("background2_jpg");
        page2.addChild(sky2);
        sky2.width = stageW;
        sky2.height = stageH;
        sky2.y = stageH;

        var sky2_back = new egret.Shape();
        sky2_back.graphics.beginFill(0xFFFFFF, 0.1);
        sky2_back.graphics.drawRect(0, 0, stageW, stageH);
        sky2_back.graphics.endFill();
        sky2_back.y = stageH;
        page2.addChild(sky2_back);

        var sky2_1:egret.Bitmap = this.createBitmapByName("2_jpg");
        page2.addChild(sky2_1);
        sky2_1.alpha = 0;
        sky2_1.x = 0;
        sky2_1.y = stageH;

        var sky2_2:egret.Bitmap = this.createBitmapByName("3_jpg");
        page2.addChild(sky2_2);
        sky2_2.alpha = 1;
        sky2_2.x = 0;
        sky2_2.y = stageH;

        var sky2_textLabel = new egret.TextField();
        sky2_textLabel.textColor = 0xFFFFFF;
        sky2_textLabel.width = stageW -250;
        sky2_textLabel.size = 32;
        sky2_textLabel.fontFamily = "Microsoft YaHei"
        sky2_textLabel.x = 150;
        sky2_textLabel.y = stageH + 500;
        sky2_textLabel.lineSpacing = 20;
        page2.addChild(sky2_textLabel);
        var keyword = true;

        sky2_back.touchEnabled = true;
        sky2_back.addEventListener(egret.TouchEvent.TOUCH_BEGIN, () => {
            if (keyword) {
                keyword = false;
                this.typerwords(sky2_textLabel, "姓名：徐元超\n年龄：21\n专业：数字媒体技术\n意向职业：游戏美工\n游戏UI视觉设计师\n工作经历： 熟练掌握PS、 3DMAX等软件。在XXXX公司有游戏原画是XX个月实习经历。", 100);
            }
        }, this); 


        
    //改变图片
        var change:Function = function() {
            var change_sky2_1 = egret.Tween.get(sky2_1);
            var change_sky2_2 = egret.Tween.get(sky2_2);
            change_sky2_1.to( {"alpha": 1}, 2000 );
            change_sky2_2.to( {"alpha": 0}, 2000 );
            change_sky2_1.wait(2000);
            change_sky2_2.wait(2000);
            change_sky2_1.to( {"alpha": 0}, 2000 );
            change_sky2_2.to( {"alpha": 1}, 2000 );
            change_sky2_1.wait(2000);
            change_sky2_2.wait(2000);
            change_sky2_1.call(change, self);
        }
        change();


//第三页
        var sky3:egret.Bitmap = this.createBitmapByName("background3_jpg");
        page3.addChild(sky3);
        sky3.width = stageW;
        sky3.height = stageH;
        sky3.y = stageH * 2;






        var textfield = new egret.TextField();
        this.addChild(textfield);
        textfield.alpha = 0;
        textfield.width = stageW - 172;
        textfield.textAlign = egret.HorizontalAlign.CENTER;
        textfield.size = 24;
        textfield.textColor = 0xffffff;
        textfield.x = 172;
        textfield.y = 135;
        this.textfield = textfield;

        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        RES.getResAsync("description_json", this.startAnimation, this)
    }


//翻页
    private MovePages(PageNumber:number, things:any ):void {
        var CurrentPage = 0;
        var Ymove:number;
        var stageW = this.stage.stageWidth;
        var stageH = this.stage.stageHeight;  
        things.touchEnabled = true;
        things.addEventListener(egret.TouchEvent.TOUCH_BEGIN, (e: egret.TouchEvent) => {
            Ymove = e.stageY - things.y;
            things.addEventListener(egret.TouchEvent.TOUCH_MOVE, startMove, this);
        }
        );

        function startMove(MouseTouch:egret.TouchEvent):void {
            things.y = MouseTouch.stageY - Ymove;
            things.addEventListener(egret.TouchEvent.TOUCH_END, stopMove, this);
        }

        function stopMove(MouseTouch:egret.TouchEvent) {
            var stageMove = egret.Tween.get(this);
            var currentY = MouseTouch.stageY - Ymove;

            if (currentY > (CurrentPage * -stageH - 300) && currentY < (CurrentPage * -stageH + 300)) { 
                stageMove.to({ x: 0, y: (CurrentPage * -stageH) }, 500, egret.Ease.backOut);
            } else if (currentY < (CurrentPage * -stageH - 300)) {
                CurrentPage++;
                stageMove.to({ x: 0, y: (CurrentPage * -stageH) }, 500, egret.Ease.backOut);
            } else if (currentY > (CurrentPage * -stageH - 300)) {  
                CurrentPage--;
                stageMove.to({ x: 0, y: (CurrentPage * -stageH) }, 500, egret.Ease.backOut);
            }
            things.removeEventListener(egret.TouchEvent.TOUCH_MOVE, startMove, this);
        }
    }

//出字
        private typerwords(object, words:string = "", speed:number):void {
        var StringArray : Array<any> = words.split("");
        var length = StringArray.length;
        for (var i = 0; i < length; i++) {
            egret.setTimeout(function () {              
                object.appendText(StringArray[Number(this)]);
            }, i, speed * i);              
        }
    }


    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
    private startAnimation(result:Array<any>):void {
        var self:any = this;

        var parser = new egret.HtmlTextParser();
        var textflowArr:Array<Array<egret.ITextElement>> = [];
        for (var i:number = 0; i < result.length; i++) {
            textflowArr.push(parser.parser(result[i]));
        }

        var textfield = self.textfield;
        var count = -1;
        var change:Function = function () {
            count++;
            if (count >= textflowArr.length) {
                count = 0;
            }
            var lineArr = textflowArr[count];

            self.changeDescription(textfield, lineArr);

            var tw = egret.Tween.get(textfield);
            tw.to({"alpha": 1}, 200);
            tw.wait(2000);
            tw.to({"alpha": 0}, 200);
            tw.call(change, self);
        };

        change();
    }

    /**
     * 切换描述内容
     * Switch to described content
     */
    private changeDescription(textfield:egret.TextField, textFlow:Array<egret.ITextElement>):void {
        textfield.textFlow = textFlow;
    }
}


