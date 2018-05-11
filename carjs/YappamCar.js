var _rootURL = "";
var container;
var SCREEN_WIDTH;
var SCREEN_HEIGHT;
var directionalLight;
var light, light1, light2, light3, light4, light5, light6, light7, light8, light9;
var hemiLight;
var areaLight1, areaLight2, areaLight3;
var _ambientLight;
var renderer, scene, camera, clock = new THREE.Clock(),
	fov = 30;
var shadow_load = new THREE.TextureLoader();
shadow_load.crossOrigin = '';
var shadow;
var lungu_load = new THREE.TextureLoader();
lungu_load.crossOrigin = '';
var lungu;
var jinqikou_load = new THREE.TextureLoader();
jinqikou_load.crossOrigin = '';
var jinqikou;
var wang_load = new THREE.TextureLoader();
wang_load.crossOrigin = '';
var wang;
var dadeng_load = new THREE.TextureLoader();
dadeng_load.crossOrigin = '';
var dadeng;
var cebiao_load = new THREE.TextureLoader();
cebiao_load.crossOrigin = '';
var cebiao;
var duge_load = new THREE.TextureLoader();
duge_load.crossOrigin = '';
var duge;
var hong_load = new THREE.TextureLoader();
hong_load.crossOrigin = '';
var hong;
var houshijingpian_load = new THREE.TextureLoader();
houshijingpian_load.crossOrigin = '';
var houshijingpian;
var weideng_load = new THREE.TextureLoader();
weideng_load.crossOrigin = '';
var weideng;
var weideng2_load = new THREE.TextureLoader();
weideng2_load.crossOrigin = '';
var weideng2;
var hei_load = new THREE.TextureLoader();
hei_load.crossOrigin = '';
var hei;
var yin_load = new THREE.TextureLoader();
yin_load.crossOrigin = '';
var yin;
var yushua_load = new THREE.TextureLoader();
yushua_load.crossOrigin = '';
var yushua;
var houbeixiang_load = new THREE.TextureLoader();
houbeixiang_load.crossOrigin = '';
var houbeixiangMap;
var houmen_load = new THREE.TextureLoader();
houmen_load.crossOrigin = '';
var houmen;
var kuangjia_load = new THREE.TextureLoader();
kuangjia_load.crossOrigin = '';
var kuangjia;
var mzuoyi_load = new THREE.TextureLoader();
mzuoyi_load.crossOrigin = '';
var mzuoyi;
var qianmen_load = new THREE.TextureLoader();
qianmen_load.crossOrigin = '';
var qianmen;
var zhongkong_load = new THREE.TextureLoader();
zhongkong_load.crossOrigin = '';
var zhongkong;
var deleteExtBoo = false;
var cubemap;
var cubemap2;
var carDoor = false;
var clickObjects = [];
var SELECTED;
var mouseX = 0,
	mouseY = 0;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var _angle;
var liangDian_boo = false;
var trunk;
var trunk_objects;
var car_highlight_color = 0xe0daca;
var deviceType = "iphone";
var autorotation = false;
var color_id = -3;
var wheel_id = 0;
var hsp = "h";
var renderBoo = false;
var tween;
var currentPosition;
var idddd = null;
var _loadingBoo = false;
var floorMat;
floorMat = new THREE.MeshBasicMaterial({
	roughness: 0.8,
	color: 0xffffff,
	metalness: 0.2,
	bumpScale: 0.0005,
});

function calcFov(d, w, r) {
	var f;
	var vertical = w;
	if (r < 1) {
		vertical = vertical / r
	};
	f = Math.atan(vertical / d / 2) * 2 * (180 / Math.PI);
	return f
};
Array.prototype.remove = function(obj) {
	for (var i = 0; i < this.length; i++) {
		var temp = this[i];
		if (!isNaN(obj)) {
			temp = i
		};
		if (temp == obj) {
			for (var j = i; j < this.length; j++) {
				this[j] = this[j + 1]
			};
			this.length = this.length - 1
		}
	}
};

function getCarColor() {
	return color_id
};

function initCarStartFun() {
	if (scene) {
		console.log('场景已经初始化');
		return
	};
	if (webSiteURL) {
		_rootURL = webSiteURL;
	};
	shadow = shadow_load.load(_rootURL + 'car/textures/map/shadow.png');
	lungu = lungu_load.load(_rootURL + 'car/textures/map/luntai011.jpg');
	jinqikou = jinqikou_load.load(_rootURL + 'car/textures/map/jinqikou.jpg');
	wang = wang_load.load(_rootURL + 'car/textures/map/wang.jpg');
	dadeng = dadeng_load.load(_rootURL + 'car/textures/map/main/dadeng.jpg');
	cebiao = cebiao_load.load(_rootURL + 'car/textures/map/main/04Default.jpg');
	duge = duge_load.load(_rootURL + 'car/textures/map/main/duge.jpg');
	hong = hong_load.load(_rootURL + 'car/textures/map/main/hong.jpg');
	houshijingpian = houshijingpian_load.load(_rootURL + 'car/textures/map/main/houshijingpian.jpg');
	weideng = weideng_load.load(_rootURL + 'car/textures/map/main/weideng.jpg');
	weideng2 = weideng2_load.load(_rootURL + 'car/textures/map/main/weidenggaohei.jpg');
	hei = hei_load.load(_rootURL + 'car/textures/map/main/hei.jpg');
	yin = yin_load.load(_rootURL + 'car/textures/map/main/yin.jpg');
	yushua = yushua_load.load(_rootURL + 'car/textures/map/main/yushua.jpg');
	houbeixiangMap = houbeixiang_load.load(_rootURL + 'car/textures/map/main/houbeixiang.jpg');
	houmen = houmen_load.load(_rootURL + 'car/textures/map/main/houmen.jpg');
	kuangjia = kuangjia_load.load(_rootURL + 'car/textures/map/main/kuangjia.jpg');
	mzuoyi = mzuoyi_load.load(_rootURL + 'car/textures/map/main/mzuoyi.jpg');
	qianmen = qianmen_load.load(_rootURL + 'car/textures/map/main/qianmen.jpg');
	zhongkong = zhongkong_load.load(_rootURL + 'car/textures/map/main/zhongkong.jpg');
	cubemap = function() {
		var path = _rootURL + "car/textures/cube/ft/6/2/";
		var format = '.jpg';
		var urls = [path + '20_b' + format, path + '20_f' + format, path + '20_u' + format, path + '20_d' + format, path + '20_r' + format, path + '20_l' + format];
		var textureCube_load = new THREE.CubeTextureLoader();
		textureCube_load.crossOrigin = '';
		var textureCube = textureCube_load.load(urls);
		textureCube.format = THREE.RGBFormat;
		return textureCube
	}();
	cubemap2 = function() {
		var path = _rootURL + "car/textures/cube/ft/6/3/";
		var format = '.jpg';
		var urls = [path + '20_b' + format, path + '20_f' + format, path + '20_u' + format, path + '20_d' + format, path + '20_r' + format, path + '20_l' + format];
		var textureCube_load = new THREE.CubeTextureLoader();
		textureCube_load.crossOrigin = '';
		var textureCube = textureCube_load.load(urls);
		textureCube.format = THREE.RGBFormat;
		return textureCube
	}();
	initDracoLoaderManage();
	container = document.getElementById('container');
	SCREEN_WIDTH = $(".carsPic").width();
	SCREEN_HEIGHT = $(".carsPic").height();
	if (getQueryString("color")) {
		color_id = getQueryString("color");
	};
	if (getQueryString("wheel")) {
		wheel_id = getQueryString("wheel");
	};
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0xFFFFFF, 1000, 3100);
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
		preserveDrawingBuffer: true
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.domElement.style.position = "relative";
	renderer.autoClear = false;
	renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
	container.appendChild(renderer.domElement);
	camera = new THREE.PerspectiveCamera(25, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 6000);
	camera.position.x = 511;
	camera.position.z = -340;
	camera.position.y = 38;
	camera.target = new THREE.Vector3();
	camera.lookAt({
		x: 0,
		y: 0,
		z: 0
	});
	camera.updateProjectionMatrix();
	controls = new THREE.OrbitControls(camera, container);
	controls.autoRotate = false;
	controls.target = new THREE.Vector3(0, 15, 0);
	controls.minDistance = 430;
	controls.maxDistance = 890;
	updateMaterial();
	window.addEventListener('resize', onWindowResize, false);
	container.addEventListener('mousedown', onDocumentMouseDown, false);
	container.addEventListener('mouseup', onDocumentMouseUp, false);
	container.addEventListener('mousemove', onDocumentMouseMove, false);
	initLights()
};

function initLoaderMode() {
	if (_meshList && _meshList.length > 0) {
		console.log('模型已经初始化');
		return
	};
	deleteSelf();
	_waitLoadingList = ["bolangxingjinqikou", "cheshenzhuangshi", "LEDqiandadeng", "LEDweideng", "lungu001", "lungu002", "lungu003", "lungu004", "lungu005", "luntai001", "luntai002", "lusuqiandadeng", "mantianxing", "putongjinqi", "putongweideng", "quanjingtianchuang", "wutianchuang", "xiaotianchuang", "weiguan"];
	_downloadingList = [];
	textureList = [];
	trunk_objects = [];
	trunk_objects = {};
	_meshList = [];
	initOptional();
	_loadingBoo = false;
	carExtLoading();
	if (floorMat && floorMat.map) {
		initObjects();
		return
	};
	var textureLoader = new THREE.TextureLoader();
	textureLoader.crossOrigin = '';
	textureLoader.load(_rootURL + 'car/textures/map/hardwood2_diffuse.jpg', function(map) {
		map.wrapS = THREE.RepeatWrapping;
		map.wrapT = THREE.RepeatWrapping;
		map.anisotropy = 4;
		map.repeat.set(5, 12);
		floorMat.map = map;
		floorMat.needsUpdate = true;
		initObjects()
	})
};

function getTrunk_objects() {
	return trunk_objects
};
var textureList = [];

function getTexture(value_name, fuc) {
	for (var i = 0; i < textureList.length; i++) {
		var temObj = textureList[i];
		if (temObj.name == value_name) {
			return temObj.value
		}
	};
	var textureListObj = {};
	textureListObj.name = value_name;
	var loader = new THREE.TextureLoader();
	loader.crossOrigin = 'anonymous';
	loader.load(_rootURL + 'car/textures/map/' + value_name, function(texture) {
		textureListObj.value = texture;
		fuc && fuc()
	});
	textureList.push(textureListObj);
	return textureListObj.value
};
var onProgress = function(xhr) {
		if (xhr.lengthComputable) {
			var percentComplete = xhr.loaded / xhr.total * 100;
		}
	};
var onError = function(xhr) {};

function initObjects() {
	dracoLoaderStart()
};

function onWindowResize() {
	var width = $(".carsPic").width(),
		height = $(".carsPic").height();
	SCREEN_WIDTH = $(".carsPic").width();
	SCREEN_HEIGHT = $(".carsPic").height();
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
	if (_deviceType == "iPad") {
		renderer.setPixelRatio(window.devicePixelRatio)
	} else {
		renderer.setPixelRatio(window.devicePixelRatio)
	}
};

function onWindowResize2(x, y, z) {
	onWindowResize();
	controls.minDistance = 630;
	controls.maxDistance = 1090;
	controls.minPolarAngle = 1.1;
	controls.maxPolarAngle = 1.5;
	if (currentPosition) {
		camera.position = currentPosition;
		controls.update();
		return
	};
	var temp_x = 610.6338829506576;
	var temp_y = 127.98624221133244;
	var temp_z = 632.6012956371738;
	if (x && y && z) {
		temp_x = x;
		temp_y = y;
		temp_z = z
	} else {};
	camera.position.x = 719.6152932416472;
	camera.position.z = -508.8229045068197;
	camera.position.y = 110.27387239032652;
	controls.update();
	var tween = new TWEEN.Tween(camera.position).to({
		x: temp_x,
		y: temp_y,
		z: temp_z
	}, 2500).start();
	tween.onUpdate(function() {
		controls.update()
	})
};

function onWindowResize3(x, y, z) {
	onWindowResize();
	controls.minDistance = 600;
	controls.maxDistance = 1200;
	controls.minPolarAngle = 1.1;
	controls.maxPolarAngle = 1.5;
	if (currentPosition) {
		camera.position = currentPosition;
		controls.update();
		return
	};
	var temp_x = 727.861742034482;
	var temp_y = 85.86046518840412;
	var temp_z = 684.6051614229046;
	if (x && y && z) {
		temp_x = x;
		temp_y = y;
		temp_z = z
	} else {};
	camera.position.x = 999.2138229181612;
	camera.position.z = -6.219216480040549;
	camera.position.y = 85.86046518840412;
	controls.update();
	tween = new TWEEN.Tween(camera.position).to({
		x: temp_x,
		y: temp_y,
		z: temp_z
	}, 2000).start();
	tween.onUpdate(function() {
		controls.update()
	})
};

function animate() {
	renderer.clear();
	renderer.render(scene, camera);
	if (autorotation) {
		controls.update()
	};
	Angle();
	TWEEN.update();
	controls.update();
	idddd = requestAnimationFrame(animate)
};

function setRenderOpen(value) {
	renderBoo = value;
	if (deleteExtBoo) {
		renderBoo = false
	};
	if (renderBoo) {
		light9.visible = true;
		hemiLight.visible = true;
		light.visible = true;
		directionalLight.visible = true;
		if (color_id == 0) {
			light9.visible = false
		};
		if (idddd == null) {
			idddd = requestAnimationFrame(animate)
		};
		$("#container").show()
	} else {
		if (idddd !== null) {
			cancelAnimationFrame(idddd);
			idddd = null
		};
		light9.visible = false;
		hemiLight.visible = false;
		light.visible = false;
		directionalLight.visible = false;
		light1.visible = false;
		light2.visible = false;
		$("#container").hide()
	}
};

function kaimen(value_list, value_direction, fun_com) {
	if (value_list.length <= 0) {
		return
	};
	if (value_direction == "hou") {
		tween = new TWEEN.Tween(trunk_objects[value_list[0]].rotation).to({
			z: -2.2
		}, 1500).start();
		if (tween) {
			tween.onUpdate(function() {
				for (var i = value_list.length - 1; i >= 0; i--) {
                    trunk_objects[value_list[i]].rotation.z = this.z;
    
				}
			});
			tween.onComplete(function() {
				trunk_objects["yeyagan"].visible = true;
				trunk_objects["yeyagan"].alpha = 0;
				if (fun_com) {
					fun_com()
				}
			})
		};
		return
	};
	var kmjd = 0;
	if (value_direction == "zuo") {
        kmjd = -2.2
        tween = new TWEEN.Tween(trunk_objects[value_list[0]].rotation).to({
            y: kmjd
        }, 1500).start();

        if (tween) {
            tween.onUpdate(function() {
                for (var i = value_list.length - 1; i >= 0; i--) {
                    trunk_objects[value_list[i]].rotation.y = this.y
                }
            });
            if (fun_com) {
                tween.onComplete(fun_com)
            }
        }
	};
	if (value_direction == "you") {
        kmjd = 200.2
        tween = new TWEEN.Tween(trunk_objects[value_list[0]].position).to({
            z: kmjd
        }, 1500).start();

        if (tween) {
            tween.onUpdate(function() {
                for (var i = value_list.length - 1; i >= 0; i--) {
                    trunk_objects[value_list[i]].position.z = this.z
                }
            });
            if (fun_com) {
                tween.onComplete(fun_com)
            }
        }
	};
	
	
};

function guanmen(value_list, value_direction, fun_com) {
	if (value_list.length <= 0) {
		return
	};
	var kmjd = 0;
	if (value_direction == "hou") {
		trunk_objects["yeyagan"].visible = false;
		tween = new TWEEN.Tween(trunk_objects[value_list[0]].rotation).to({
			z: kmjd
		}, 1500).start();
		if (tween) {
			tween.onUpdate(function() {
				for (var i = value_list.length - 1; i >= 0; i--) {
					trunk_objects[value_list[i]].rotation.z = this.z
				}
			});
			if (fun_com) {
				tween.onComplete(fun_com)
			}
		};
		return
	};
	if (value_direction == "zuo") {
        
        tween = new TWEEN.Tween(trunk_objects[value_list[0]].rotation).to({
            y: kmjd
        }, 1500).start();

        if (tween) {
            tween.onUpdate(function() {
                for (var i = value_list.length - 1; i >= 0; i--) {
                    trunk_objects[value_list[i]].rotation.y = this.y
                }
            });
            if (fun_com) {
                tween.onComplete(fun_com)
            }
        }
	};
	if (value_direction == "you") {
        kmjd = 93.80;
        tween = new TWEEN.Tween(trunk_objects[value_list[0]].position).to({
            z: kmjd
        }, 1500).start();

        if (tween) {
            tween.onUpdate(function() {
                for (var i = value_list.length - 1; i >= 0; i--) {
                    trunk_objects[value_list[i]].position.z = this.z
                }
            });
            if (fun_com) {
                tween.onComplete(fun_com)
            }
        }
	};
};

function onDocumentMouseMove(event) {
	if (!carDoor) {
		return
	};
	var width_w = $(".carsPic").width();
	var width_h = $(".carsPic").height();
	var topNum = 0;
	if ($(".carsFlash") && $(".carsFlash").position()) {
		topNum = $(".carsFlash").position().top
	};
	mouse.x = (event.clientX / width_w) * 2 - 1;
	mouse.y = -((event.clientY - topNum) / width_h) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length > 0) {
		SELECTED = intersects[0].object;
		if (SELECTED.name == "chemen001" || SELECTED.name == "chemen002" || SELECTED.name == "chemen003" || SELECTED.name == "chemen004" || SELECTED.name == "houbeixianggai001" || SELECTED.name == "CheMen_Nei_ZuoQian" || SELECTED.name == "CheMen_Nei_ZuoHou" || SELECTED.name == "CheMen_Nei_YouQian" || SELECTED.name == "CheMen_Nei_YouHou" || SELECTED.name == "zuoyi" || SELECTED.name == "ZhongKongTai") {
			container.style.cursor = 'pointer'
		} else {
			container.style.cursor = 'auto'
		}
	} else {
		container.style.cursor = 'auto'
	}
};

function getCenterPoint(mesh) {
	var middle = new THREE.Vector3();
	var geometry = mesh.geometry;
	geometry.computeBoundingBox();
	middle.x = (geometry.boundingBox.max.x + geometry.boundingBox.min.x) / 2;
	middle.y = (geometry.boundingBox.max.y + geometry.boundingBox.min.y) / 2;
	middle.z = (geometry.boundingBox.max.z + geometry.boundingBox.min.z) / 2;
	return middle
};
var zuo_qian_boo = false;
var zuo_hou_boo = false;
var you_qian_boo = false;
var you_hou_boo = false;
var hou_boo = false;
var zuo_qian_animation = false;
var zuo_hou_animation = false;
var you_qian_animation = false;
var you_hou_animation = false;
var hou_animation = false;

function zqcom() {
	zuo_qian_animation = false
};

function zhcom() {
	zuo_hou_animation = false
};

function yqcom() {
	you_qian_animation = false
};

function yhcom() {
	you_hou_animation = false
};

function hcom() {
	hou_animation = false
};

function setCarDoor(value) {
	carDoor = value;
	setHighlights(value)
};

function onDocumentMouseDown(event) {
	var width_w = $(".carsPic").width();
	var width_h = $(".carsPic").height();
	var topNum = 0;
	if ($(".carsFlash") && $(".carsFlash").position()) {
		topNum = $(".carsFlash").position().top
	};
	if (tween && !zuo_qian_animation && !zuo_hou_animation && !you_qian_animation && !you_hou_animation && !hou_animation) {
		tween.stop()
	};
	if (!carDoor) {
		return
	};
	mouse.x = (event.clientX / width_w) * 2 - 1;
	mouse.y = -((event.clientY - topNum) / width_h) * 2 + 1;
	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(scene.children);
	if (intersects.length > 0) {
        SELECTED = intersects[0].object;
        
		switch (SELECTED.name) {
		case "chemen001":
			if (!zuo_qian_animation) {
				zuo_qian_animation = true;
				if (zuo_qian_boo) {
					guanmen(obj_z_q_List, "zuo", zqcom)
				} else {
					kaimen(obj_z_q_List, "zuo", zqcom)
				};
				zuo_qian_boo = !zuo_qian_boo
			};
			break;
		case "chemen002":
			if (!zuo_hou_animation) {
				zuo_hou_animation = true;
				if (zuo_hou_boo) {
					guanmen(obj_z_h_List, "zuo", zhcom)
				} else {
					kaimen(obj_z_h_List, "zuo", zhcom)
				};
				zuo_hou_boo = !zuo_hou_boo
			};
			break;
		case "chemen003":
			if (!you_qian_animation) {
                you_qian_animation = true;
				if (you_qian_boo) {
					guanmen(obj_y_q_List, "you", yqcom)
				} else {
					kaimen(obj_y_q_List, "you", yqcom)
				};
				you_qian_boo = !you_qian_boo
			};
			break;
		case "chemen004":
			if (!you_hou_animation) {
                you_hou_animation = true;           
				if (you_hou_boo) {
					guanmen(obj_y_h_List, "you", yhcom)
				} else {
					kaimen(obj_y_h_List, "you", yhcom)
				};
				you_hou_boo = !you_hou_boo
			};
			break;
		case "houbeixianggai001":
			if (!hou_animation) {
				hou_animation = true;
				if (hou_boo) {
					guanmen(obj_h_List, "hou", hcom)
				} else {
					kaimen(obj_h_List, "hou", hcom)
				};
				hou_boo = !hou_boo
			};
			break
		};
		if (SELECTED.name == "CheMen_Nei_ZuoQian" || SELECTED.name == "CheMen_Nei_ZuoHou" || SELECTED.name == "CheMen_Nei_YouQian" || SELECTED.name == "CheMen_Nei_YouHou" || SELECTED.name == "zuoyi" || SELECTED.name == "ZhongKongTai") {
			var car_event = new Event('EnterInterior', {
				bubbles: 'true',
				cancelable: 'true'
			});
			document.dispatchEvent(car_event)
		}
	}
};

function onDocumentMouseUp(event) {};

function toTurnTo2(value) {
	tween = new TWEEN.Tween(camera.position).to({
		x: value.x,
		y: value.y,
		z: value.z
	}, 1500).start();
	if (tween) {
		tween.onUpdate(function() {
			controls.update()
		})
	}
};

function toTurnTo(value) {
	switch (value) {
	case "qian":
		if (_deviceType == "Windows") {
			tween = new TWEEN.Tween(camera.position).to({
				x: 711.742830086375,
				y: 54.383687081585244,
				z: 263.2534220412243
			}, 1500).start()
		} else {
			tween = new TWEEN.Tween(camera.position).to({
				x: 830.1418050285754,
				y: 64.2622097467097,
				z: 307.04583413468345
			}, 1500).start()
		};
		break;
	case "ce":
		if (_angle) {
			if (_angle == "右") {
				if (_deviceType == "Windows") {
					tween = new TWEEN.Tween(camera.position).to({
						x: 649.21460,
						y: 67.85931,
						z: 796.3114466
					}, 1500).start()
				} else {
					tween = new TWEEN.Tween(camera.position).to({
						x: 649.21460,
						y: 67.85931,
						z: 796.3114466
					}, 1500).start()
				}
			} else {
				if (_deviceType == "Windows") {
					tween = new TWEEN.Tween(camera.position).to({
						x: 341.4738578624717,
						y: 48.84428449899045,
						z: -678.1615147665732
					}, 1500).start()
				} else {
					tween = new TWEEN.Tween(camera.position).to({
						x: 679.970929,
						y: 118.5799000,
						z: -763.719541
					}, 1500).start()
				}
			}
		};
		break;
	case "hou":
		break
	};
	if (tween) {
		tween.onUpdate(function() {
			controls.update()
		})
	}
};

function getQueryString(name) {
	var reg = new RegExp("^" + name + "=(\\d+)", "i");
	var LocString = String(window.document.location.href);
	var t = LocString.split("&&");
	if (t && t.length > 1) {
		var r = t[1].match(reg);
		if (r != null) return unescape(r[1]);
		return null
	};
	return null
};

function Angle() {
	var vector = new THREE.Vector3(0, 0, 0);
	var ray = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	var param1 = ray.ray.direction;
	if (light9) {
		light9.position.set(-camera.position.x - 700, camera.position.y + 1500, camera.position.z);
	};
	_angle = "";
	if (param1.x < -0.9) {
		_angle = "前"
	};
	if (param1.x > 0.9) {
		_angle = "后"
	};
	if (param1.x > -0.95 && param1.x < 0.9) {
		if (param1.z > 0) {
			_angle = "左"
		} else {
			_angle = "右"
		}
	};
	if (!liangDian_boo) {
		return
	};
	setShowHigh(_angle);
};

function setHighlights(value) {
	liangDian_boo = value;
	meshVisible("box005", false);
	meshVisible("box006", false);
	meshVisible("box008", false);
	meshVisible("box009", false);
	meshVisible("box010", false)
};

function setShowHigh(value_direction) {
	meshVisible("box005", false);
	meshVisible("box006", false);
	meshVisible("box008", false);
	meshVisible("box009", false);
	meshVisible("box010", false);
	if (value_direction == "左") {
		if (!zuo_qian_animation) {
			if (zuo_qian_boo) {
				meshVisible("box010", true, "box016")
			} else {
				meshVisible("box010", true, "box010")
			}
		};
		if (!zuo_hou_animation) {
			if (zuo_hou_boo) {
				meshVisible("box009", true, "box017")
			} else {
				meshVisible("box009", true, "box009")
			}
		}
	};
	if (value_direction == "右") {
		if (!you_qian_animation) {
			if (you_qian_boo) {
				meshVisible("box006", true, "box018")
			} else {
				meshVisible("box006", true, "box006")
			}
		};
		if (!you_hou_animation) {
			if (you_hou_boo) {
				meshVisible("box005", true, "box019")
			} else {
				meshVisible("box005", true, "box005")
			}
		}
	};
	if (value_direction == "后") {
		if (!hou_animation) {
			if (hou_boo) {
				meshVisible("box008", true, "box015")
			} else {
				meshVisible("box008", true, "box008")
			}
		}
	}
};

function ppp(mesh) {
	var s = mesh;
	var halfWidth = $(".carsPic").width() / 2;
	var halfHeight = $(".carsPic").height() / 2;
	var vector = s.position.clone();
	vector.project(camera);
	var result = {
		x: Math.round(vector.x * halfWidth + halfWidth),
		y: Math.round(-vector.y * halfHeight + halfHeight)
	};
	return result
};

//更改标注点的位置
function meshVisible(name, boo, box_name) {
	if (_meshList && _meshList.length > 0) {
		if (document.getElementById("vBtn_" + name)) {
			var divDian = document.getElementById("vBtn_" + name);
			divDian.style.visibility = boo ? "visible" : "hidden";
			if (boo && box_name) {
				divDian.style.left = ppp(trunk_objects[box_name]).x + "px";
				divDian.style.top = ppp(trunk_objects[box_name]).y + "px";
				trunk_objects[box_name].visible = false
			}
		}
	}
};

function buttonClick(value) {
	if (value == 100) {
		controls.target = new THREE.Vector3(0, -5, 0);
		var width = $(".carsPic").width(),
			height = $(".carsPic").height();
		if (width > height) {
			hsp = "h"
		} else {
			hsp = "s"
		};
		if (hsp == "h") {
			onWindowResize3();
			return
		};
		if (hsp == "s") {
			onWindowResize3();
			return
		};
		controls.minDistance = 330;
		controls.maxDistance = 790;
		controls.minPolarAngle = 1.1;
		controls.maxPolarAngle = 1.5;
		camera.position.x = 337.0007215888911;
		camera.position.z = 290.80212643803344;
		camera.position.y = 72.01692611163857;
		controls.update()
	};
	if (value == 33332) {
		console.log("打印相机位置:", camera.position)
	};
	if (value == 0) {
		if (color_id == 0) {
			return
		};
		color_id = value;
		light9.visible = false;
		car_main_color = 0xffffff;
		car_highlight_color = 0xffffff;
		hemiLight.color = new THREE.ColorNode(0xffffff);
		hemiLight.groundColor = new THREE.ColorNode(0x000000);
		hemiLight.intensity = 0.905;
		light.color = new THREE.ColorNode(0xbbbcbc);
		directionalLight.color = new THREE.ColorNode(0xbbbcbc);
		light.intensity = 0.12;
		directionalLight.intensity = 0.12;
		reflectance.number = 0.60;
		power.number = 2.0;
		mtl.color.value.setHex(car_main_color);
		mtl.specular = new THREE.ColorNode(car_highlight_color);
		mtl.shininess = new THREE.FloatNode(30);
		mtl.shadow = new THREE.FloatNode(0.6);
		mtl.build();
		trunk_objects["zuoyi"].material.color = new THREE.ColorNode(0xdcdbdb)
	};
	if (value == 1) {
		if (color_id == 1) {
			return
		};
		color_id = value;
		light9.visible = true;
		light9.color = new THREE.ColorNode(0xfb919a);
		light9.intensity = 0.07;
		car_main_color = 0x4a1a1c;
		car_highlight_color = 0xffffff;
		hemiLight.color = new THREE.ColorNode(0xffffff);
		hemiLight.groundColor = new THREE.ColorNode(0x000000);
		hemiLight.intensity = 1.00;
		light.color = new THREE.ColorNode(0x632224);
		directionalLight.color = new THREE.ColorNode(0x632224);
		light.intensity = 0.05;
		directionalLight.intensity = 0.05;
		reflectance.number = 0.5;
		power.number = 1.1;
		mtl.color.value.setHex(car_main_color);
		mtl.specular = new THREE.ColorNode(car_highlight_color);
		mtl.shininess = new THREE.FloatNode(25);
		mtl.shadow = new THREE.FloatNode(4.6);
		light1.color = new THREE.ColorNode(0x2c2b2b);
		light2.color = new THREE.ColorNode(0x2c2b2b);
		mtl.build();
		trunk_objects["zuoyi"].material.color = new THREE.ColorNode(0xdcdbdb)
	};
	if (value == 2) {
		if (color_id == 2) {
			return
		};
		color_id = value;
		light9.visible = true;
		light9.color = new THREE.ColorNode(0x3c3d3d);
		light9.intensity = 0.17;
		car_main_color = 0x202c14;
		car_highlight_color = 0xffffff;
		hemiLight.color = new THREE.ColorNode(0x686868);
		hemiLight.groundColor = new THREE.ColorNode(0x000000);
		hemiLight.intensity = 3.00;
		light.color = new THREE.ColorNode(0x334920);
		directionalLight.color = new THREE.ColorNode(0x334920);
		light.intensity = 0.06;
		directionalLight.intensity = 0.06;
		reflectance.number = 0.7;
		power.number = 1.1;
		mtl.color.value.setHex(car_main_color);
		mtl.specular = new THREE.ColorNode(car_highlight_color);
		mtl.shininess = new THREE.FloatNode(29);
		mtl.shadow = new THREE.FloatNode(5.6);
		light1.color = new THREE.ColorNode(0x2c2b2b);
		light2.color = new THREE.ColorNode(0x2c2b2b);
		mtl.build();
		trunk_objects["zuoyi"].material.color = new THREE.ColorNode(0xdcdbdb)
	};
	if (value == 3) {
		if (color_id == 3) {
			return
		};
		color_id = value;
		light9.visible = true;
		light9.color = new THREE.ColorNode(0x363737);
		light9.intensity = 0.22;
		car_main_color = 0x719dda;
		car_highlight_color = 0xffffff;
		hemiLight.color = new THREE.ColorNode(0x767677);
		hemiLight.groundColor = new THREE.ColorNode(0x000000);
		hemiLight.intensity = 1.70;
		light.color = new THREE.ColorNode(0x4b70a3);
		directionalLight.color = new THREE.ColorNode(0x4b70a3);
		light.intensity = 0.06;
		directionalLight.intensity = 0.06;
		reflectance.number = 0.40;
		power.number = 1.1;
		mtl.color.value.setHex(car_main_color);
		mtl.specular = new THREE.ColorNode(car_highlight_color);
		mtl.shininess = new THREE.FloatNode(25);
		mtl.shadow = new THREE.FloatNode(4.6);
		mtl.build();
		light1.color = new THREE.ColorNode(0x2c2b2b);
		light2.color = new THREE.ColorNode(0x2c2b2b);
		trunk_objects["zuoyi"].material.color = new THREE.ColorNode(0xffffff)
	};
	if (value == 4) {
		if (color_id == 4) {
			return
		};
		color_id = value;
		light9.visible = true;
		light9.color = new THREE.ColorNode(0x5e5e5e);
		light9.intensity = 0.2;
		car_main_color = 0x222222;
		car_highlight_color = 0xffffff;
		hemiLight.color = new THREE.ColorNode(0x979797);
		hemiLight.groundColor = new THREE.ColorNode(0x000000);
		hemiLight.intensity = 2.0;
		light.color = new THREE.ColorNode(0x242424);
		directionalLight.color = new THREE.ColorNode(0x242424);
		light.intensity = 0.20;
		directionalLight.intensity = 0.20;
		reflectance.number = 0.60;
		power.number = 1.1;
		mtl.color.value.setHex(car_main_color);
		mtl.specular = new THREE.ColorNode(car_highlight_color);
		mtl.shininess = new THREE.FloatNode(25);
		mtl.shadow = new THREE.FloatNode(4.6);
		mtl.build();
		light1.color = new THREE.ColorNode(0x2c2b2b);
		light2.color = new THREE.ColorNode(0x2c2b2b);
		trunk_objects["zuoyi"].material.color = new THREE.ColorNode(0xdcdbdb)
	};
	if (value == 5) {
		if (color_id == 5) {
			return
		};
		color_id = value;
		light9.visible = true;
		light9.color = new THREE.ColorNode(0x727272);
		light9.intensity = 0.2;
		car_main_color = 0x000000;
		car_highlight_color = 0xffffff;
		hemiLight.color = new THREE.ColorNode(0xffffff);
		hemiLight.groundColor = new THREE.ColorNode(0x000000);
		hemiLight.intensity = 2.0;
		light.color = new THREE.ColorNode(0x1c1c1c);
		directionalLight.color = new THREE.ColorNode(0x1c1c1c);
		light.intensity = 0.20;
		directionalLight.intensity = 0.20;
		reflectance.number = 0.60;
		power.number = 1.1;
		mtl.color.value.setHex(car_main_color);
		mtl.specular = new THREE.ColorNode(car_highlight_color);
		mtl.shininess = new THREE.FloatNode(25);
		mtl.shadow = new THREE.FloatNode(3.9);
		mtl.build();
		light1.color = new THREE.ColorNode(0x3b3a3a);
		light2.color = new THREE.ColorNode(0x3b3a3a);
		trunk_objects["zuoyi"].material.color = new THREE.ColorNode(0x676767)
	};
	if (value == 6) {
		if (color_id == 6) {
			return
		};
		color_id = value;
		light9.visible = true;
		light9.color = new THREE.ColorNode(0x414141);
		light9.intensity = 0.2;
		car_main_color = 0x393939;
		car_highlight_color = 0xffffff;
		hemiLight.color = new THREE.ColorNode(0x979797);
		hemiLight.groundColor = new THREE.ColorNode(0x000000);
		hemiLight.intensity = 3.00;
		light.color = new THREE.ColorNode(0x4e4d4d);
		directionalLight.color = new THREE.ColorNode(0x4e4d4d);
		light.intensity = 0.30;
		directionalLight.intensity = 0.30;
		reflectance.number = 0.55;
		power.number = 1.3;
		mtl.color.value.setHex(car_main_color);
		mtl.specular = new THREE.ColorNode(car_highlight_color);
		mtl.shininess = new THREE.FloatNode(20);
		mtl.shadow = new THREE.FloatNode(2.9);
		mtl.build();
		light1.color = new THREE.ColorNode(0x777676);
		light2.color = new THREE.ColorNode(0x777676);
		trunk_objects["zuoyi"].material.color = new THREE.ColorNode(0x676767)
	};
	if (value == 7) {
		if (color_id == 7) {
			return
		};
		color_id = value;
		light9.visible = true;
		light9.color = new THREE.ColorNode(0x999999);
		light9.intensity = 0.17;
		car_main_color = 0x342d27;
		car_highlight_color = 0xffffff;
		hemiLight.color = new THREE.ColorNode(0x8e8d8d);
		hemiLight.groundColor = new THREE.ColorNode(0x000000);
		hemiLight.intensity = 2.50;
		light.color = new THREE.ColorNode(0x413931);
		directionalLight.color = new THREE.ColorNode(0x413931);
		light.intensity = 0.20;
		directionalLight.intensity = 0.20;
		reflectance.number = 0.55;
		power.number = 1.3;
		mtl.color.value.setHex(car_main_color);
		mtl.specular = new THREE.ColorNode(car_highlight_color);
		mtl.shininess = new THREE.FloatNode(20);
		mtl.shadow = new THREE.FloatNode(2.9);
		mtl.build();
		light1.color = new THREE.ColorNode(0x4f4f4f);
		light2.color = new THREE.ColorNode(0x4f4f4f);
		trunk_objects["zuoyi"].material.color = new THREE.ColorNode(0x676767)
	};
	if (value == 8) {
		if (color_id == 8) {
			return
		};
		color_id = value;
		light9.visible = true;
		light9.color = new THREE.ColorNode(0x3c3c3c);
		light9.intensity = 0.18;
		car_main_color = 0x6e6458;
		car_highlight_color = 0xffffff;
		hemiLight.color = new THREE.ColorNode(0x8c8c8c);
		hemiLight.groundColor = new THREE.ColorNode(0x000000);
		hemiLight.intensity = 2.00;
		light.color = new THREE.ColorNode(0x6e6458);
		directionalLight.color = new THREE.ColorNode(0x6e6458);
		light.intensity = 0.18;
		directionalLight.intensity = 0.18;
		reflectance.number = 0.55;
		power.number = 1.3;
		mtl.color.value.setHex(car_main_color);
		mtl.specular = new THREE.ColorNode(car_highlight_color);
		mtl.shininess = new THREE.FloatNode(20);
		mtl.shadow = new THREE.FloatNode(2.9);
		mtl.build();
		light1.color = new THREE.ColorNode(0x4f4f4f);
		light2.color = new THREE.ColorNode(0x4f4f4f);
		trunk_objects["zuoyi"].material.color = new THREE.ColorNode(0xdcdbdb)
	}
};

function addExt() {
	deleteExtBoo = false;
	if (!controls.enabled) {
		controls.enabled = true;
		controls.reset()
	};
	if (renderBoo) {
		console.log('当前已经是车身模式');
		return
	};
	if (_meshList && _meshList.length == 0) {
		initLoaderMode();
		return
	};
	for (var u = 0; u < _meshList.length; u++) {
		var object = _meshList[u];
		scene.remove(object)
	};
	for (var i = 0; i < _meshList.length; i++) {
		var object = _meshList[i];
		scene.add(object)
	};
	setRenderOpen(true);
};

function deleteExt() {
	deleteExtBoo = true;
	controls.saveState();
	controls.enabled = false;
	if (!renderBoo) {
		return
	};
	currentPosition = camera.position;
	deleteSelf();
}