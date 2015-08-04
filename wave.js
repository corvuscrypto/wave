var waveHolder=[];
function WaveEffect(e,elem){
  var color = elem.getAttribute('wave-color')!==null?elem.getAttribute('wave-color'):'rgba(128,128,128,0.5)';
  if(color.indexOf('#')!==-1){
    color = 'rgba('+toRGBA(color);
    this.a = 1;
  } else if(color.indexOf('rgba')!==-1||color.indexOf('hsla')!==-1){
    this.a=color.split(',')[3].split(')')[0];
    color = color.split(',').splice(0,3).join(',');
    this.ff = this.a;
  } else if(color.indexOf('rgb')!==-1||color.indexOf('hsl')!==-1){
    var prefix = (color.indexOf('rgb')!==-1)?'rgba':'hsla';
    this.a = 1;
    color = prefix+color.substring(3,color.length-1);
  }
  this.t = elem.getAttribute('wave-time')!==null?parseInt(elem.getAttribute('wave-time')):500;
  this.v=color;
  this.wo=[e.offsetX,e.offsetY];
  this.prev = window.getComputedStyle(elem,null).backgroundColor;
  this.elem=elem;

  this.doWave = this.doWave.bind(this)
  this.fadeWave = this.fadeWave.bind(this)
  this.rw = this.rw.bind(this)
  this.ltn=document.addEventListener("mouseup",this.fadeWave);
  this.wt=setTimeout(this.doWave,16.67);
}
WaveEffect.prototype = {
  ff:1,
  i:-1,
  r: 0,//size in percent
  a: 0,//alpha
  v:null,//color string
  t:0,//wave finish time
  wt: null,//wave timeout
  ft: null,//fade timeout
  wo: [],//origin [x,y]
  prev: "",//previous background styling
  elem: null,//element
  ltn:null//listener
}
  WaveEffect.prototype.rw = function(){
      var x = this.prev+ " radial-gradient(circle at "+this.wo[0]+"px "+this.wo[1]+"px,"+this.v+","+this.a+") "+this.r+"%,rgba(0,0,0,0) 0)";
      this.elem.style.background=x;
    }
  WaveEffect.prototype.doWave = function(){
            if(this.r<100){
              this.r += 100*(1000/this.t)/60
              this.wt=setTimeout(this.doWave,16.67);
            } else {
              this.r=100;
            }
            this.rw();
          }
  WaveEffect.prototype.fadeWave = function(){
              document.removeEventListener(this.ltn);
              if(this.a>0){
                this.a-= this.ff*(1000/this.t)/60;
                this.ft=setTimeout(this.fadeWave,16.67);
                this.rw();
              }
              else{
                removeWave(this);
              }

            }
function toRGBA(v){
          hexMap = {'0':0x0,'1':0x1,'2':0x2,'3':0x3,'4':0x4,'5':0x5,
                    '6':0x6,'7':0x7,'8':0x8,'9':0x9,'a':0xa,'b':0xb,
                    'c':0xc,'d':0xd,'e':0xe,'f':0xf};
          v=v.split('#')[1];
          if(v.length===3){
            v = (hexMap[v[0].toLowerCase()]<<4|hexMap[v[0].toLowerCase()])+','+
                (hexMap[v[1].toLowerCase()]<<4|hexMap[v[1].toLowerCase()])+','+
                (hexMap[v[2].toLowerCase()]<<4|hexMap[v[2].toLowerCase()]);
          } else {
            v = (hexMap[v[0].toLowerCase()]<<4|hexMap[v[1].toLowerCase()])+','+
                (hexMap[v[2].toLowerCase()]<<4|hexMap[v[3].toLowerCase()])+','+
                (hexMap[v[4].toLowerCase()]<<4|hexMap[v[5].toLowerCase()]);
          }
          return v;
        }
function removeWave(a){
  waveHolder.splice(a.i,1);
}
document.addEventListener('DOMContentLoaded',function(a){
  var allElems = document.body.getElementsByTagName('*');
  for(var i=0;i<allElems.length;i++){
    elem = allElems[i];
    if(elem.getAttribute('wave-effect')!==null){
      elem.addEventListener('mousedown',function(e){
        var newWave = new WaveEffect(e,e.target);
        newWave.i = waveHolder.length;
        waveHolder.push(newWave);
      });
    }
  }
});
