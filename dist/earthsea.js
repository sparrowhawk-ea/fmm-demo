import { __extends, __spreadArray } from "tslib";
var Ea = /** @class */ (function () {
    // =============================================================================================================================
    function Ea() {
        var _this = this;
        this.fAddRandomUseName = this.addRandomUseName.bind(this);
        this.fOnUpdate = this.onUpdate.bind(this);
        this.fRemoveUncheckedUseNames = this.removeUncheckedUseNames.bind(this);
        this.fSubmit = this.submit.bind(this);
        this.names1000 = [];
        this.customElementIds = [];
        this.realNamesShown = [];
        this.submitted = false;
        this.useNamesShown = [];
        this.namesRemaining = __spreadArray([], Object.keys(Ea.namesAll));
        this.useNamesShownAsBooleanArray = [];
        Array.from(Array(10)).forEach(function (_) {
            var _a;
            return (_a = _this.names1000).push.apply(_a, _this.namesRemaining);
        });
        this.names1000.forEach(function (n, i) { return (_this.names1000[i] = String(i) + ': ' + n); });
        this.randomQuotes = Ea.randomize(Object.entries(Ea.quotes), 5);
    }
    // =============================================================================================================================
    Ea.randomize = function (input, count) {
        var _a;
        for (var i = input.length; --i > 0;) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [input[j], input[i]], input[i] = _a[0], input[j] = _a[1];
        }
        return count === undefined ? input : input.slice(0, count);
    };
    // =============================================================================================================================
    Ea.prototype.addRandomUseName = function () {
        var remaining = this.namesRemaining.length;
        if (remaining === 0)
            return window.alert('No more!');
        var random = Math.floor(Math.random() * remaining);
        var useName = this.namesRemaining.splice(random, 1)[0];
        // Sort the useNamesShown alphabetically to deliberately screw up array indexing
        var index = this.useNamesShown.findIndex(function (n) { return n > useName; });
        if (index < 0) {
            this.useNamesShown.push(useName);
            this.useNamesShownAsBooleanArray.push(false);
        }
        else {
            this.useNamesShown.splice(index, 0, useName);
            this.useNamesShownAsBooleanArray.splice(index, 0, false);
        }
        this.useNamesAdded(index, useName);
        return this.composeMinimap();
    };
    // =============================================================================================================================
    Ea.prototype.onChangeUseName = function (elts) {
        var names = [];
        if (elts instanceof RadioNodeList) {
            Array.prototype.forEach.call(elts, function (c) { return c.checked && names.push(c.value); });
        }
        else if (elts.checked) {
            names.push(elts.value);
        }
        this.setUseNamesSelected(names);
    };
    // =============================================================================================================================
    Ea.prototype.onUpdate = function () {
        /**/
    };
    // =============================================================================================================================
    Ea.prototype.removeUncheckedUseNames = function () {
        var selected = this.useNamesGetSelected();
        var namesRemoved = [];
        var indexesRemovedInReverse = [];
        for (var i = this.useNamesShown.length; --i >= 0;) {
            // loop must run in reverse order so we can splice() away safely
            if (selected[i])
                continue;
            var useName = this.useNamesShown.splice(i, 1)[0];
            this.namesRemaining.push(useName);
            namesRemoved.push(Ea.namesAll[useName]);
            indexesRemovedInReverse.push(i);
        }
        this.useNamesShownAsBooleanArray = this.useNamesShown.map(function (_v) { return true; });
        this.useNamesRemoved(indexesRemovedInReverse);
        this.updateRealNamesSelected(namesRemoved);
        this.composeMinimap();
    };
    // =============================================================================================================================
    Ea.prototype.setUseNamesSelected = function (names) {
        this.useNamesShownAsBooleanArray = this.mapUseNamesToBooleanArray(names);
        this.updateRealNamesShown();
    };
    // =============================================================================================================================
    Ea.prototype.submit = function () {
        this.submitted = true;
        this.composeMinimap();
    };
    // =============================================================================================================================
    Ea.prototype.mapUseNamesToBooleanArray = function (names) {
        var selected = names.sort();
        var maxSelected = selected.length - 1;
        var iSelected = 0;
        return this.useNamesShown.map(function (name) {
            if (iSelected > maxSelected || name !== selected[iSelected])
                return false;
            iSelected++;
            return true;
        });
    };
    // =============================================================================================================================
    Ea.prototype.takeSnapshot = function () {
        /**/
    };
    // =============================================================================================================================
    Ea.prototype.updateRealNamesShown = function () {
        var selected = this.useNamesGetSelected();
        var checkedNames = [];
        this.useNamesShown.forEach(function (n, i) { return selected[i] && checkedNames.push(Ea.namesAll[n]); });
        if (this.realNamesShown.join('') !== checkedNames.join('')) {
            this.realNamesShown = checkedNames;
            this.takeSnapshot();
        }
    };
    // =============================================================================================================================
    Ea.prototype.useNamesGetSelected = function () {
        return this.useNamesShownAsBooleanArray;
    };
    // =============================================================================================================================
    Ea.prototype.composeMinimap = function () {
        this.customElementIds = __spreadArray([], this.customElementIds); // will trigger a full rerender on minimap
    };
    Ea.adventures = {
        a: 'A Wizard of Earthsea',
        b: 'The Tombs of Atuan',
        c: 'The Farthest Shore',
        d: 'Tehanu',
        e: 'The Other Wind',
        f: 'Tales from Earthsea'
    };
    Ea.controls = {
        adventure: {
            label: 'Adventure',
            placeholder: 'e.g. Tehanu',
            type: 'select'
        },
        adventure2: {
            label: 'More Adventure',
            placeholder: 'e.g. The Farthest Shore',
            type: 'select'
        },
        adventureAuto: {
            label: 'Adventure Auto',
            placeholder: 'e.g. The Tombs of Atuan',
            type: 'select'
        },
        agree: {
            label: 'Shall we continue?',
            placeholder: undefined,
            type: 'checkbox'
        },
        danceDate: {
            label: 'Long Dance date',
            placeholder: 'e.g. Midsummer Eve',
            type: 'date'
        },
        danceRange: {
            label: 'Long Dance duration (0-10 hours)',
            max: '10',
            min: '0',
            placeholder: 'e.g. 7',
            type: 'range'
        },
        danceToggle: {
            label: 'Long Dance?',
            placeholder: undefined,
            type: 'checkbox'
        },
        deed: {
            label: 'Deed of Erreth-Akbe',
            placeholder: 'e.g. and on his breast lay the rune-ring broken',
            type: 'textarea'
        },
        email: {
            label: 'Sending Runes',
            placeholder: 'e.g. duny@gont, sparrowhawk@roke',
            type: 'email'
        },
        quoteRadios: {
            label: 'Quote',
            placeholder: 'e.g. Take care, Tenar',
            type: 'radio'
        },
        realName: {
            label: 'Real Name',
            placeholder: 'e.g. Ged, Tenar, Tehanu, Anieb, Medra',
            type: 'password'
        },
        realNames: {
            label: 'Real Names',
            placeholder: 'e.g. Ged, Tenar',
            size: '4',
            type: 'select'
        },
        realNames2: {
            label: 'More Real Names',
            placeholder: 'e.g. Medra, Anieb',
            size: '4',
            type: 'select'
        },
        useName: {
            label: 'Use Name',
            placeholder: 'e.g. Sparrowhawk, Arha, Therru, Flag, Otter',
            type: 'text'
        },
        useNames: {
            label: 'Use Names (Alphabetical)'
        },
        useNamesAll: {
            label: 'Names (1000+ checkboxes)'
        }
    };
    Ea.css = "\n\tbody {\n\t\tfont-family: sans-serif;\n\t\t-webkit-font-smoothing: antialiased;\n\t\t-moz-osx-font-smoothing: grayscale;\n\t}\n\tdiv.headbar {\n\t\tbackground: whitesmoke;\n\t\tborder: 1px solid black;\n\t\tpadding: 5px 10px;\n\t}\n\tdiv.heading {\n\t\tfloat: left;\n\t}\n\tdiv.heading h1 {\n\t\tfont-weight: 500;\n\t\tmargin: 0;\n\t}\n\tdiv.anchors {\n\t\tfloat: right;\n\t\tpadding-top: 4px;\n\t\twidth: 2%;\n\t}\n\tdiv.anchors > div {\n\t\theight: 1rem;\n\t}\n\tdiv.anchor > div.active {\n\t\tborder: 1px solid blue;\n\t}\n\t.fmm-panel {\n\t\tfloat: right;\n\t\theight: 6.5rem;\n\t\tmargin: 5px;\n\t\twidth: 10%;\n\t}\n\tdiv.detail {\n\t\tfloat: right;\n\t\twidth: 38%;\n\t}\n\tdiv.fmm-detail {\n\t\twidth: 400px;\n\t}\n\tdiv.fmm-popup {\n\t\theight: 6rem;\n\t}\n\tdiv.fmm-frame {\n\t\tborder-left: 2px solid darkgray;\n\t\tborder-right: 2px solid darkgray;\n\t\tpadding: 0 2px;\n\t}\n\tlabel.form-check-label {\n\t\twhite-space: nowrap;\n\t}\n\t";
    Ea.debounceMsec = 200;
    Ea.initialValues = {
        adventure: '',
        adventure2: '',
        adventureAuto: '',
        agree: false,
        danceDate: '',
        danceRange: 5,
        danceToggle: false,
        deed: '',
        email: '',
        quoteRadios: '',
        realName: '',
        realNames: [],
        realNames2: [],
        useName: '',
        useNames: [],
        useNamesAll: []
    };
    Ea.messages = {
        adventure: {
            required: 'Adventure is required'
        },
        adventure2: {
            required: 'More adventure is required'
        },
        adventureAuto: {
            required: 'Adventure auto is required'
        },
        agree: {
            required: 'Agreement is required to proceed'
        },
        danceDate: {
            required: 'Must know the Long Dance'
        },
        danceRange: {
            min: 'Must Long Dance at least 7 hours'
        },
        danceToggle: {
            required: 'Must join the Long Dance'
        },
        deed: {
            required: 'Must recount the Deed of Erreth-Akbe'
        },
        email: {
            email: 'Sending runes must be a valid email address'
        },
        quoteRadios: {
            required: 'Quote selection is required'
        },
        realName: {
            min: 'Real name must be at least 6 characters',
            required: 'Real name is required'
        },
        realNames: {},
        realNames2: {},
        useName: {
            required: 'Use name is required'
        },
        useNames: {},
        useNamesAll: {}
    };
    Ea.namesAll = {
        Aider: 'Hara',
        Akaren: 'Akaren',
        Apple: 'Hayohe',
        Ard: 'Ard',
        Arha: 'Tenar',
        Arren: 'Lebannen',
        Aspen: 'Erisen',
        Ath: 'Ath',
        Ayo: 'Ayo',
        Azver: 'Azver',
        Beech: 'Beech',
        Benderesh: 'Benderesk',
        Blackbeard: 'Blackbeard',
        Brand: 'Brand',
        Cob: 'Cob',
        Crow: 'Crow',
        Deyala: 'Deyala',
        Duby: 'Duy',
        Diamond: 'Essiri',
        Dragonfly: 'Irian',
        Dulse: 'Heleth',
        Duny: 'Ged-Duny',
        Early: 'Teriel',
        Elfarran: 'Elfarran',
        Elt: 'Elt',
        Ember: 'Elehal',
        Ennas: 'Ennas',
        'Erreth-Akbe': 'Erreth-Akbe',
        Firelord: 'Firelord',
        Flag: 'Anieb',
        Flint: 'Flint',
        Gamble: 'Gamble',
        Gelluk: 'Tinaral',
        Gensher: 'Gensher',
        Gift: 'Emer',
        Goha: 'Tenar',
        Golden: 'Golden',
        Gully: 'Irioth',
        Hare: 'Hare',
        Hawk: 'Ged-Hawk',
        Heather: 'Heather',
        Hemlock: 'Hemlock',
        Highdrake: 'Highdrake',
        Hound: 'Hound',
        Ioeth: 'Ioeth',
        Ivory: 'Ivory',
        Ivy: 'Ivy',
        Jasper: 'Jasper',
        Kalessin: 'Kalessin',
        Kelub: 'Ged-Kelub',
        Kossil: 'Kossil',
        Kurremkarmerruk: 'Kurremkarmerruk',
        Lark: 'Lark',
        Licky: 'Licky',
        Lily: 'Mevre',
        Littleash: 'Littleash',
        Losen: 'Losen',
        Maharion: 'Maharion',
        Manan: 'Manan',
        Mead: 'Mean',
        Mebbeth: 'Mebbeth',
        Morred: 'Morred',
        Moss: 'Hatha',
        Murre: 'Murre',
        Nemmerle: 'Nemmerle',
        Nereger: 'Nereger',
        Nesty: 'Nesty',
        Ogion: 'Aihal',
        Onyx: 'Onyx',
        Orm: 'Orm',
        OrmEmbar: 'OrmEmbar',
        OrmIrian: 'OrmIrian',
        Otak: 'Irioth',
        Otter: 'Medra-Otter',
        Pechvarry: 'Pechvarry',
        Penthe: 'Penthe',
        Rose: 'Etaudis',
        Rowan: 'Rowan',
        Segoy: 'Segoy',
        Seppel: 'Seppel',
        Serrathen: 'Serrathen',
        Serret: 'Serret',
        Serriadh: 'Serriadh',
        Seserakh: 'Seserakh',
        Silence: 'Aihal-Silence',
        Skiorh: 'Skiorh',
        Sopli: 'Spoli',
        Spark: 'Spark',
        Sparrowhawk: 'Ged',
        Sunbright: 'Ayeth',
        Tangle: 'Tangle',
        Tern: 'Medra',
        Thar: 'Thar',
        Therru: 'Tehanu',
        Thol: 'Thol',
        Thorion: 'Thorion',
        Tuly: 'Tuly',
        Uahto: 'Uahto',
        Underhill: 'Yevaud',
        Veil: 'Yahan',
        Vetch: 'Estarriol',
        Yarrow: 'Kest',
        Yevaud: 'Yevaud'
    };
    Ea.quotes = {
        a: 'Ged.',
        b: 'That is between me and my shadow.',
        c: 'I am here, I Ged the Sparrowhawk, and I summon my shadow!',
        d: 'Arw sobriost.',
        e: 'I did . . . I did not know what else to do, Segoy.',
        f: 'Which of us saved the other from the Labyrinth, Ged?',
        g: 'The women, the hand.  Ask them.  In the village.  I did see the Mountain.',
        h: 'With your name, Yevaud.',
        i: 'I named you once, I think.',
        j: 'Take care, Tenar.',
        k: 'But dragons live a thousand years ... They are worth talking to, as you might guess.',
        l: 'The greatest gift of this age of the world, and it was given by a poor old foolish woman in sealskins to a silly lout'
    };
    Ea.aggregateLabels = {
        quoteRadios: Ea.controls.quoteRadios.label,
        useNames: Ea.controls.useNames.label,
        useNamesAll: Ea.controls.useNamesAll.label
    };
    return Ea;
}());
export { Ea };
// =================================================================================================================================
//						E A R E A C T I V E
// =================================================================================================================================
var EaReactive = /** @class */ (function (_super) {
    __extends(EaReactive, _super);
    // =============================================================================================================================
    function EaReactive() {
        return _super.call(this) || this;
    }
    // =============================================================================================================================
    EaReactive.prototype.updateRealNamesSelected = function (_namesRemoved) {
        /**/
    };
    // =============================================================================================================================
    EaReactive.prototype.useNamesAdded = function (_, _n) {
        this.useNamesShown = __spreadArray([], this.useNamesShown);
    };
    // =============================================================================================================================
    EaReactive.prototype.useNamesRemoved = function (_) {
        this.useNamesShown = __spreadArray([], this.useNamesShown);
    };
    return EaReactive;
}(Ea));
export { EaReactive };
// =================================================================================================================================
//						E A S T A T E
// =================================================================================================================================
var EaState = /** @class */ (function (_super) {
    __extends(EaState, _super);
    // =============================================================================================================================
    function EaState() {
        return _super.call(this) || this;
    }
    // =============================================================================================================================
    EaState.prototype.setStateMutators = function (setStateRealNamesShown, setStateUseNamesShown) {
        this.setStateRealNamesShown = setStateRealNamesShown;
        this.setStateUseNamesShown = setStateUseNamesShown;
    };
    // =============================================================================================================================
    EaState.prototype.updateRealNamesSelected = function (_namesRemoved) {
        /**/
    };
    // =============================================================================================================================
    EaState.prototype.updateRealNamesShown = function () {
        _super.prototype.updateRealNamesShown.call(this);
        this.setStateRealNamesShown(this.realNamesShown);
    };
    // =============================================================================================================================
    EaState.prototype.useNamesAdded = function (_, _n) {
        this.setStateUseNamesShown(__spreadArray([], this.useNamesShown));
    };
    // =============================================================================================================================
    EaState.prototype.useNamesRemoved = function (_) {
        this.setStateUseNamesShown(__spreadArray([], this.useNamesShown));
    };
    return EaState;
}(Ea));
export { EaState };
