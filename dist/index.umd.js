(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.sayHello = {}));
})(this, (function (exports) { 'use strict';

    class Ea {
        constructor() {
            this.fAddRandomUseName = this.addRandomUseName.bind(this);
            this.fOnUpdate = this.onUpdate.bind(this);
            this.fRemoveUncheckedUseNames = this.removeUncheckedUseNames.bind(this);
            this.fSubmit = this.submit.bind(this);
            this.names1000 = [];
            this.customElementIds = [];
            this.realNamesShown = [];
            this.submitted = false;
            this.useNamesShown = [];
            this.namesRemaining = [...Object.keys(Ea.namesAll)];
            this.useNamesShownAsBooleanArray = [];
            Array.from(Array(10)).forEach(_ => this.names1000.push(...this.namesRemaining));
            this.names1000.forEach((n, i) => (this.names1000[i] = String(i) + ': ' + n));
            this.randomQuotes = Ea.randomize(Object.entries(Ea.quotes), 5);
        }
        static randomize(input, count) {
            for (let i = input.length; --i > 0;) {
                const j = Math.floor(Math.random() * (i + 1));
                [input[i], input[j]] = [input[j], input[i]];
            }
            return count === undefined ? input : input.slice(0, count);
        }
        addRandomUseName() {
            const remaining = this.namesRemaining.length;
            if (remaining === 0)
                return window.alert('No more!');
            const random = Math.floor(Math.random() * remaining);
            const useName = this.namesRemaining.splice(random, 1)[0];
            const index = this.useNamesShown.findIndex(n => n > useName);
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
        }
        onChangeUseName(elts) {
            const names = [];
            if (elts instanceof RadioNodeList) {
                Array.prototype.forEach.call(elts, (c) => c.checked && names.push(c.value));
            }
            else if (elts.checked) {
                names.push(elts.value);
            }
            this.setUseNamesSelected(names);
        }
        onUpdate() {
        }
        removeUncheckedUseNames() {
            const selected = this.useNamesGetSelected();
            const namesRemoved = [];
            const indexesRemovedInReverse = [];
            for (let i = this.useNamesShown.length; --i >= 0;) {
                if (selected[i])
                    continue;
                const useName = this.useNamesShown.splice(i, 1)[0];
                this.namesRemaining.push(useName);
                namesRemoved.push(Ea.namesAll[useName]);
                indexesRemovedInReverse.push(i);
            }
            this.useNamesShownAsBooleanArray = this.useNamesShown.map(_v => true);
            this.useNamesRemoved(indexesRemovedInReverse);
            this.updateRealNamesSelected(namesRemoved);
            this.composeMinimap();
        }
        setUseNamesSelected(names) {
            this.useNamesShownAsBooleanArray = this.mapUseNamesToBooleanArray(names);
            this.updateRealNamesShown();
        }
        submit() {
            this.submitted = true;
            this.composeMinimap();
        }
        mapUseNamesToBooleanArray(names) {
            const selected = names.sort();
            const maxSelected = selected.length - 1;
            let iSelected = 0;
            return this.useNamesShown.map(name => {
                if (iSelected > maxSelected || name !== selected[iSelected])
                    return false;
                iSelected++;
                return true;
            });
        }
        takeSnapshot() {
        }
        updateRealNamesShown() {
            const selected = this.useNamesGetSelected();
            const checkedNames = [];
            this.useNamesShown.forEach((n, i) => selected[i] && checkedNames.push(Ea.namesAll[n]));
            if (this.realNamesShown.join('') !== checkedNames.join('')) {
                this.realNamesShown = checkedNames;
                this.takeSnapshot();
            }
        }
        useNamesGetSelected() {
            return this.useNamesShownAsBooleanArray;
        }
        composeMinimap() {
            this.customElementIds = [...this.customElementIds];
        }
    }
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
            placeholder: '',
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
            placeholder: '',
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
    Ea.css = `
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
		margin: 5px;
		width: 10%;
	}
	div.detail {
		float: right;
		width: 38%;
	}
	div.fmm-detail {
		width: 400px;
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
	`;
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
    class EaReactive extends Ea {
        constructor() {
            super();
        }
        updateRealNamesSelected(_namesRemoved) {
        }
        useNamesAdded(_, _n) {
            this.useNamesShown = [...this.useNamesShown];
        }
        useNamesRemoved(_) {
            this.useNamesShown = [...this.useNamesShown];
        }
    }
    class EaState extends Ea {
        constructor() {
            super();
            this.setStateRealNamesShown = (_) => { };
            this.setStateUseNamesShown = this.setStateRealNamesShown;
        }
        setStateMutators(setStateRealNamesShown, setStateUseNamesShown) {
            this.setStateRealNamesShown = setStateRealNamesShown;
            this.setStateUseNamesShown = setStateUseNamesShown;
        }
        updateRealNamesSelected(_namesRemoved) {
        }
        updateRealNamesShown() {
            super.updateRealNamesShown();
            this.setStateRealNamesShown(this.realNamesShown);
        }
        useNamesAdded(_, _n) {
            this.setStateUseNamesShown([...this.useNamesShown]);
        }
        useNamesRemoved(_) {
            this.setStateUseNamesShown([...this.useNamesShown]);
        }
    }

    exports.Ea = Ea;
    exports.EaReactive = EaReactive;
    exports.EaState = EaState;

    Object.defineProperty(exports, '__esModule', { value: true });

}));