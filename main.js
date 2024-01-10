var canvas = document.getElementById("game")
var ctx = canvas.getContext("2d")
ctx.globalAlpha = 1
var canvas2 = document.getElementById("next")
var ctx2 = canvas2.getContext("2d")
var canvas3 = document.getElementById("store")
var ctx3 = canvas3.getContext("2d")
var defurl = 'https://coderpro1234-2.github.io'
const tetrominoes = [
  [0,5,0,0,0,5,0,0,0,5,0,0,0,5,0,0],
  [0,0,0,0,0,3,3,0,0,3,3,0,0,0,0,0],
  [0,0,0,0,0,4,4,0,4,4,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0],
  [0,0,0,0,0,2,0,0,0,2,0,0,0,2,2,0],
  [0,0,0,0,0,0,6,0,0,0,6,0,0,6,6,0],
  [0,0,0,0,7,7,7,0,0,7,0,0,0,0,0,0]
]
var fx = 0
var fy = 0
var nxtt = 0
var musicplay = 0
var timer = 0
var lines = 0
var score = 0
var useswap = true
var running = true
var instout = true
gblocks = []
fblock = []
sblock = []
nxtt = 0
function reset_vars() {
  fx = 0
  fy = 0
  nxtt = 0
  lines = 0
  score = 0
  useswap = false
  running = true
  instout = false
  gblocks = [
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0,
    0,0,0,0,0,0,0,0,0,0
  ]
  fblock = [
  0,0,0,0,
  0,0,0,0,
  0,0,0,0,
  0,0,0,0
  ]
  sblock = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
  nxtt = randnumber(0,6)
}
function randnumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}
function checkmusic() {
  if (musicplay == 0) {
    tetrismusic.play()
    musicplay = 1
  }
  else {
    tetrismusic.pause()
    musicplay = 0
  }
}
function gettileid(id) {
  return document.getElementById("tile"+id);
}
function draw_gblocks() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  count = 0
  a = 0
  b = 0
  i = 0
  while (i < 20) {
    b = 0
    i2 = 0
    while (i2 < 10) {
      ctx.drawImage(gettileid(gblocks[count]),b,a,20,20)
      count++
      b += 20
      i2 ++
    }
    a += 20
    i ++
  }
}
function draw_fblock() {
  count = 0
  a = 0
  b = 0
  i = 0
  while (i < 4) {
    b = 0
    i2 = 0
    while (i2 < 4) {
      ctx.drawImage(gettileid(fblock[count]),b+(fx*20),a+(fy*20),20,20)
      count++
      b += 20
      i2 ++
    }
    a += 20
    i ++
  }
}
function draw_next() {
  ctx2.clearRect(0, 0, canvas.width, canvas.height)
  count = 0
  a = 0
  b = 0
  i = 0
  while (i < 4) {
    b = 0
    i2 = 0
    while (i2 < 4) {
      ctx2.drawImage(gettileid(tetrominoes[nxtt][count]),b,a,20,20)
      count++
      b += 20
      i2 ++
    }
    a += 20
    i ++
  }
}
function draw_store() {
  ctx3.clearRect(0, 0, canvas.width, canvas.height)
  count = 0
  a = 0
  b = 0
  i = 0
  while (i < 4) {
    b = 0
    i2 = 0
    while (i2 < 4) {
      ctx3.drawImage(gettileid(sblock[count]),b,a,20,20)
      count++
      b += 20
      i2 ++
    }
    a += 20
    i ++
  }
}
function draw_ghost() {
  o_fy = fy
  i = 0
  while (i != -1) {
    fy=fy+1
    if (f_coll_g()){
      fy=fy-1
      i = -2
    }
    i++
  }
  ctx.globalAlpha = 0.5
  draw_fblock()
  ctx.globalAlpha = 1
  fy = o_fy
}
function g_xy(x, y) {
  if (y > 19 || x < 0 || x > 9) {
    return(1)
  }
  return gblocks[y*10+x]
}
function f_xy(x, y) {
  if (y > 3 || x < 0 || x > 3) {
    return(1)
  }
  return fblock[y*4+x]
}
function f_coll_g() {
  i = 0
  while (i < 4) {
    i2 = 0
    while (i2 < 4) {
      if (g_xy(i2+fx, i+fy) != 0 && f_xy(i2, i) != 0) {
        return(true)
      }
      i2 ++
    }
    i ++
  }
  return(false)
}
function add_f_to_g() {
  i = 0
  while (i < 4) {
    i2 = 0
    while (i2 < 4) {
      if (f_xy(i2, i) != 0) {
        gblocks[(i+fy)*10+(i2+fx)] = f_xy(i2, i)
      }
      i2 ++
    }
    i ++
  }
}
function sro(off, color) {
  gblocks[0+(off*10)] = color
  gblocks[1+(off*10)] = color
  gblocks[2+(off*10)] = color
  gblocks[3+(off*10)] = color
  gblocks[4+(off*10)] = color
  gblocks[5+(off*10)] = color
  gblocks[6+(off*10)] = color
  gblocks[7+(off*10)] = color
  gblocks[8+(off*10)] = color
  gblocks[9+(off*10)] = color
  draw_gblocks()
}
function you_died() {
  c1 = 0
  c2 = 0
  const deathinter = setInterval(function(){
    if (running == false) {
      sro(c1,c2+1)
      c1 += 1
      c2 += 1
      c2 = c2 % 7
      if (c1 == 20) {
        c1 = 0
        c2 = 0
        setTimeout(function(){
          reset_vars()
          running = true
          gblocks = [
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0
          ]
          set_f()
          update_screen()
        }, 400)
      }
    }
    else {
      clearInterval(deathinter)
      return
    }
  },70)
}
function swapinst() {
  instout = !instout
  txt = "Instrunctions:<br>Up Arrow / W to snap block to bottom.<br>Left or Right Arrows / A or D to move block left or right.<br>Down Arrow / S to move block one tile down.<br> X to rotate block clockwise.<br>Z to rotate block counter-clockwise.<br>Q or E tp add or swap the block in the store."
  if (instout) {
    document.getElementById("instructions").innerHTML = txt
  }
  else {
    document.getElementById("instructions").innerHTML = ""
  }
}
function r_c() {
  const tmp = []
  i = 0
  while (i < 4) {
    i2 = 0
    while (i2 < 4) {
      tmp.push(f_xy(i, (3-i2)))
      i2 ++
    }
    i ++
  }
  fblock = tmp
}
function r_cc() {
  r_c()
  r_c()
  r_c()
}
function set_f(t = false) {
  useswap = false
  if (t) {
    set_f(true)
  }
  fx = 3
  fy = 0
  fblock = tetrominoes[nxtt]
  b = randnumber(0,6)
  while (b == nxtt) {
    b = randnumber(0,6)
  }
  nxtt = b
  if (f_coll_g()) {
    running = false
    you_died()
  }
}
function check_line() {
  lcc = 0
  i = 0
  while (i < 20) {
    line = 0
    i2 = 0
    while (i2 < 10) {
      if (g_xy(i2, i) != 0) {
        line ++
      }
      i2 ++
    }
    if (line == 10) {
      lines ++
      lcc ++
      gblocks.splice(i*10, 10)
      gblocks.unshift(0,0,0,0,0,0,0,0,0,0)
    }
    i ++
  }
  if (lcc == 1) {
    score += 40
  }
  else if (lcc == 2) {
    score += 100
  }
  else if (lcc == 3) {
    score += 300
  }
  else if (lcc == 4) {
    score += 1200
  }
}
function update_screen() {
  check_line()
  draw_gblocks()
  draw_ghost()
  draw_fblock()
  draw_next()
  draw_store()
  document.getElementById("lines").innerHTML = (lines.toString()).padStart(6,"0")
  document.getElementById("score").innerHTML = (score.toString()).padStart(6,"0")
}
function mglt() {
  fy += 1
  if (f_coll_g()) {
    fy -= 1
    add_f_to_g()
    set_f()
  }
}
function check_swap() {
  i = 0
  e = 0
  while (i < 16) {
    if (sblock[i] != 0) {
      e += 1
    }
    i++
  }
  if (e == 0) {
    sblock = fblock
    set_f()
    useswap = true
  }
  else if (e != 0 && (!useswap)) {
    tmp = sblock
    sblock = fblock
    fblock = tmp
    useswap = true
  }
}
window.onload = function(){
  reset_vars()
  set_f()
  update_screen()
  setInterval(function(){
    if (musicplay == 1) {
      timer += 1
      document.getElementById("musicdisk").style.transform = 'rotate('+timer+'deg)'
      timer = timer % 360
    }
  }, 1)
  setInterval(function(){
    if (running) {
      mglt()
      update_screen()
    }
  }, 500)
  document.addEventListener("keydown", function(event){
    if (running) {
      if (event.key == "ArrowLeft" || event.key == "a") {
        fx -= 1
        if (f_coll_g()) {
          fx += 1
        }
      }
      if (event.key == "ArrowRight" || event.key == "d") {
        fx += 1
        if (f_coll_g()) {
          fx -= 1
        }
      }
      if (event.key == "ArrowDown" || event.key == "s") {
        fy += 1
        if (f_coll_g()) {
          fy -= 1
          add_f_to_g()
          set_f()
        }
      }
      if (event.key == "ArrowUp" || event.key == "w") {
        tf = false
        while (!tf) {
          fy += 1
          if (f_coll_g()) {
            tf = true
          }
        }
        fy -= 1
        add_f_to_g()
        set_f()
      }
      if (event.key == "x") {
        r_c()
        if (f_coll_g()) {
          r_cc()
        }
      }
       if (event.key == "z") {
        r_cc()
        if (f_coll_g()) {
          r_c()
        }
      }
      if (event.key == "q" || event.key == "e" ) {
        check_swap()
      }
      update_screen()
    }
  })
}
