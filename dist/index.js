(function(o,r){typeof exports=="object"&&typeof module!="undefined"?r(exports):typeof define=="function"&&define.amd?define(["exports"],r):(o=typeof globalThis!="undefined"?globalThis:o||self,r(o.FmmDemo={}))})(this,function(o){"use strict";const r=class{constructor(){this.fAddRandomUseName=this.addRandomUseName.bind(this),this.fOnUpdate=this.onUpdate.bind(this),this.fRemoveUncheckedUseNames=this.removeUncheckedUseNames.bind(this),this.fSubmit=this.submit.bind(this),this.names1000=[],this.customElementIds=[],this.realNamesShown=[],this.submitted=!1,this.useNamesShown=[],this.namesRemaining=[...Object.keys(r.namesAll)],this.useNamesShownAsBooleanArray=[],Array.from(Array(10)).forEach(a=>this.names1000.push(...this.namesRemaining)),this.names1000.forEach((a,e)=>this.names1000[e]=String(e)+": "+a),this.randomQuotes=r.randomize(Object.entries(r.quotes),5)}static randomize(a,e){for(let s=a.length;--s>0;){const t=Math.floor(Math.random()*(s+1));[a[s],a[t]]=[a[t],a[s]]}return e===void 0?a:a.slice(0,e)}addRandomUseName(){const a=this.namesRemaining.length;if(a===0)return window.alert("No more!");const e=Math.floor(Math.random()*a),s=this.namesRemaining.splice(e,1)[0],t=this.useNamesShown.findIndex(i=>i>s);return t<0?(this.useNamesShown.push(s),this.useNamesShownAsBooleanArray.push(!1)):(this.useNamesShown.splice(t,0,s),this.useNamesShownAsBooleanArray.splice(t,0,!1)),this.useNamesAdded(t,s),this.composeMinimap()}onChangeUseName(a){const e=[];a instanceof RadioNodeList?Array.prototype.forEach.call(a,s=>s.checked&&e.push(s.value)):a.checked&&e.push(a.value),this.setUseNamesSelected(e)}onUpdate(){}removeUncheckedUseNames(){const a=this.useNamesGetSelected(),e=[],s=[];for(let t=this.useNamesShown.length;--t>=0;){if(a[t])continue;const i=this.useNamesShown.splice(t,1)[0];this.namesRemaining.push(i),e.push(r.namesAll[i]),s.push(t)}this.useNamesShownAsBooleanArray=this.useNamesShown.map(t=>!0),this.useNamesRemoved(s),this.updateRealNamesSelected(e),this.composeMinimap()}setUseNamesSelected(a){this.useNamesShownAsBooleanArray=this.mapUseNamesToBooleanArray(a),this.updateRealNamesShown()}submit(){this.submitted=!0,this.composeMinimap()}mapUseNamesToBooleanArray(a){const e=a.sort(),s=e.length-1;let t=0;return this.useNamesShown.map(i=>t>s||i!==e[t]?!1:(t++,!0))}takeSnapshot(){}updateRealNamesShown(){const a=this.useNamesGetSelected(),e=[];this.useNamesShown.forEach((s,t)=>a[t]&&e.push(r.namesAll[s])),this.realNamesShown.join("")!==e.join("")&&(this.realNamesShown=e,this.takeSnapshot())}useNamesGetSelected(){return this.useNamesShownAsBooleanArray}composeMinimap(){this.customElementIds=[...this.customElementIds]}};let n=r;n.adventures={a:"A Wizard of Earthsea",b:"The Tombs of Atuan",c:"The Farthest Shore",d:"Tehanu",e:"The Other Wind",f:"Tales from Earthsea"},n.controls={adventure:{label:"Adventure",placeholder:"e.g. Tehanu",type:"select"},adventure2:{label:"More Adventure",placeholder:"e.g. The Farthest Shore",type:"select"},adventureAuto:{label:"Adventure Auto",placeholder:"e.g. The Tombs of Atuan",type:"select"},agree:{label:"Shall we continue?",placeholder:"",type:"checkbox"},danceDate:{label:"Long Dance date",placeholder:"e.g. Midsummer Eve",type:"date"},danceRange:{label:"Long Dance duration (0-10 hours)",max:"10",min:"0",placeholder:"e.g. 7",type:"range"},danceToggle:{label:"Long Dance?",placeholder:"",type:"checkbox"},deed:{label:"Deed of Erreth-Akbe",placeholder:"e.g. and on his breast lay the rune-ring broken",type:"textarea"},email:{label:"Sending Runes",placeholder:"e.g. duny@gont, sparrowhawk@roke",type:"email"},quoteRadios:{label:"Quote",placeholder:"e.g. Take care, Tenar",type:"radio"},realName:{label:"Real Name",placeholder:"e.g. Ged, Tenar, Tehanu, Anieb, Medra",type:"password"},realNames:{label:"Real Names",placeholder:"e.g. Ged, Tenar",size:"4",type:"select"},realNames2:{label:"More Real Names",placeholder:"e.g. Medra, Anieb",size:"4",type:"select"},useName:{label:"Use Name",placeholder:"e.g. Sparrowhawk, Arha, Therru, Flag, Otter",type:"text"},useNames:{label:"Use Names (Alphabetical)"},useNamesAll:{label:"Names (1000+ checkboxes)"}},n.css=`
	body {
		font-family: sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
	div.headbar {
		background: whitesmoke;
		border: 1px solid black;
		padding: 5px 10px;
	}
	div.heading {
		float: left;
	}
	div.heading h1 {
		font-weight: 500;
		margin: 0;
	}
	div.anchors {
		float: right;
		padding-top: 4px;
		width: 2%;
	}
	div.anchors > div {
		height: 1rem;
	}
	div.anchor > div.active {
		border: 1px solid blue;
	}
	.fmm-panel {
		float: right;
		height: 6.5rem;
		width: 25%;
	}
	div.detail {
		float: right;
		margin: 5px;
		width: 22%;
	}
	div.fmm-detail {
		width: 300px;
	}
	div.fmm-popup {
		height: 6rem;
	}
	div.fmm-frame {
		border-left: 2px solid darkgray;
		border-right: 2px solid darkgray;
		padding: 0 2px;
	}
	label.form-check-label {
		white-space: nowrap;
	}
	`,n.debounceMsec=200,n.initialValues={adventure:"",adventure2:"",adventureAuto:"",agree:!1,danceDate:"",danceRange:5,danceToggle:!1,deed:"",email:"",quoteRadios:"",realName:"",realNames:[],realNames2:[],useName:"",useNames:[],useNamesAll:[]},n.messages={adventure:{required:"Adventure is required"},adventure2:{required:"More adventure is required"},adventureAuto:{required:"Adventure auto is required"},agree:{required:"Agreement is required to proceed"},danceDate:{required:"Must know the Long Dance"},danceRange:{min:"Must Long Dance at least 7 hours"},danceToggle:{required:"Must join the Long Dance"},deed:{required:"Must recount the Deed of Erreth-Akbe"},email:{email:"Sending runes must be a valid email address"},quoteRadios:{required:"Quote selection is required"},realName:{min:"Real name must be at least 6 characters",required:"Real name is required"},realNames:{},realNames2:{},useName:{required:"Use name is required"},useNames:{},useNamesAll:{}},n.namesAll={Aider:"Hara",Akaren:"Akaren",Apple:"Hayohe",Ard:"Ard",Arha:"Tenar",Arren:"Lebannen",Aspen:"Erisen",Ath:"Ath",Ayo:"Ayo",Azver:"Azver",Beech:"Beech",Benderesh:"Benderesk",Blackbeard:"Blackbeard",Brand:"Brand",Cob:"Cob",Crow:"Crow",Deyala:"Deyala",Duby:"Duy",Diamond:"Essiri",Dragonfly:"Irian",Dulse:"Heleth",Duny:"Ged-Duny",Early:"Teriel",Elfarran:"Elfarran",Elt:"Elt",Ember:"Elehal",Ennas:"Ennas","Erreth-Akbe":"Erreth-Akbe",Firelord:"Firelord",Flag:"Anieb",Flint:"Flint",Gamble:"Gamble",Gelluk:"Tinaral",Gensher:"Gensher",Gift:"Emer",Goha:"Tenar",Golden:"Golden",Gully:"Irioth",Hare:"Hare",Hawk:"Ged-Hawk",Heather:"Heather",Hemlock:"Hemlock",Highdrake:"Highdrake",Hound:"Hound",Ioeth:"Ioeth",Ivory:"Ivory",Ivy:"Ivy",Jasper:"Jasper",Kalessin:"Kalessin",Kelub:"Ged-Kelub",Kossil:"Kossil",Kurremkarmerruk:"Kurremkarmerruk",Lark:"Lark",Licky:"Licky",Lily:"Mevre",Littleash:"Littleash",Losen:"Losen",Maharion:"Maharion",Manan:"Manan",Mead:"Mean",Mebbeth:"Mebbeth",Morred:"Morred",Moss:"Hatha",Murre:"Murre",Nemmerle:"Nemmerle",Nereger:"Nereger",Nesty:"Nesty",Ogion:"Aihal",Onyx:"Onyx",Orm:"Orm",OrmEmbar:"OrmEmbar",OrmIrian:"OrmIrian",Otak:"Irioth",Otter:"Medra-Otter",Pechvarry:"Pechvarry",Penthe:"Penthe",Rose:"Etaudis",Rowan:"Rowan",Segoy:"Segoy",Seppel:"Seppel",Serrathen:"Serrathen",Serret:"Serret",Serriadh:"Serriadh",Seserakh:"Seserakh",Silence:"Aihal-Silence",Skiorh:"Skiorh",Sopli:"Spoli",Spark:"Spark",Sparrowhawk:"Ged",Sunbright:"Ayeth",Tangle:"Tangle",Tern:"Medra",Thar:"Thar",Therru:"Tehanu",Thol:"Thol",Thorion:"Thorion",Tuly:"Tuly",Uahto:"Uahto",Underhill:"Yevaud",Veil:"Yahan",Vetch:"Estarriol",Yarrow:"Kest",Yevaud:"Yevaud"},n.quotes={a:"Ged.",b:"That is between me and my shadow.",c:"I am here, I Ged the Sparrowhawk, and I summon my shadow!",d:"Arw sobriost.",e:"I did . . . I did not know what else to do, Segoy.",f:"Which of us saved the other from the Labyrinth, Ged?",g:"The women, the hand.  Ask them.  In the village.  I did see the Mountain.",h:"With your name, Yevaud.",i:"I named you once, I think.",j:"Take care, Tenar.",k:"But dragons live a thousand years ... They are worth talking to, as you might guess.",l:"The greatest gift of this age of the world, and it was given by a poor old foolish woman in sealskins to a silly lout"},n.aggregateLabels={quoteRadios:r.controls.quoteRadios.label,useNames:r.controls.useNames.label,useNamesAll:r.controls.useNamesAll.label};class h extends n{constructor(){super()}updateRealNamesSelected(e){}useNamesAdded(e,s){this.useNamesShown=[...this.useNamesShown]}useNamesRemoved(e){this.useNamesShown=[...this.useNamesShown]}}class l extends n{constructor(){super();this.setStateRealNamesShown=e=>{},this.setStateUseNamesShown=this.setStateRealNamesShown}setStateMutators(e,s){this.setStateRealNamesShown=e,this.setStateUseNamesShown=s}updateRealNamesSelected(e){}updateRealNamesShown(){super.updateRealNamesShown(),this.setStateRealNamesShown(this.realNamesShown)}useNamesAdded(e,s){this.setStateUseNamesShown([...this.useNamesShown])}useNamesRemoved(e){this.setStateUseNamesShown([...this.useNamesShown])}}o.Ea=n,o.EaReactive=h,o.EaState=l});
