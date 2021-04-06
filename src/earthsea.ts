import { FmmMapString, FmmMapValues } from '@fmmp/core';

// =================================================================================================================================
//						E A
// =================================================================================================================================
type SetStrArray = (s: string[]) => void;
export abstract class Ea {
	public static readonly adventures: Record<string, string> = {
		a: 'A Wizard of Earthsea',
		b: 'The Tombs of Atuan',
		c: 'The Farthest Shore',
		d: 'Tehanu',
		e: 'The Other Wind',
		f: 'Tales from Earthsea'
	};
	public static readonly controls: Record<keyof Earthsea | string, Record<string, string>> = {
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
	public static readonly css = `
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
	public static readonly debounceMsec = 200;
	public static readonly initialValues: Earthsea = {
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
	public static readonly messages: Record<keyof Earthsea | string, Record<string, string>> = {
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
	public static readonly namesAll: Record<string, string> = {
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
	public static readonly quotes = {
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
	public static readonly aggregateLabels: FmmMapString = {
		quoteRadios: Ea.controls.quoteRadios.label,
		useNames: Ea.controls.useNames.label,
		useNamesAll: Ea.controls.useNamesAll.label
	};
	public readonly fAddRandomUseName = this.addRandomUseName.bind(this);
	public readonly fOnUpdate = this.onUpdate.bind(this);
	public readonly fRemoveUncheckedUseNames = this.removeUncheckedUseNames.bind(this);
	public readonly fSubmit = this.submit.bind(this);
	public readonly names1000: string[] = [];
	public readonly randomQuotes: [string, string][];
	public customWidgetIds: string[] = [];
	public realNamesShown: string[] = [];
	public submitted = false;
	public useNamesShown: string[] = [];
	private readonly namesRemaining = [...Object.keys(Ea.namesAll)];
	private useNamesShownAsBooleanArray: boolean[] = [];

	// =============================================================================================================================
	protected constructor() {
		Array.from(Array(10)).forEach(_ => this.names1000.push(...this.namesRemaining));
		this.names1000.forEach((n, i) => (this.names1000[i] = String(i) + ': ' + n));
		this.randomQuotes = Ea.randomize(Object.entries(Ea.quotes), 5);
	}

	// =============================================================================================================================
	public static randomize<T>(input: T[], count?: number): T[] {
		for (let i = input.length; --i > 0; ) {
			const j = Math.floor(Math.random() * (i + 1));
			[input[i], input[j]] = [input[j], input[i]];
		}
		return count === undefined ? input : input.slice(0, count);
	}

	// =============================================================================================================================
	public addRandomUseName(): void {
		const remaining = this.namesRemaining.length;
		if (remaining === 0) return window.alert('No more!');
		const random = Math.floor(Math.random() * remaining);
		const useName = this.namesRemaining.splice(random, 1)[0];
		// Sort the useNamesShown alphabetically to deliberately screw up array indexing
		const index = this.useNamesShown.findIndex(n => n > useName);
		if (index < 0) {
			this.useNamesShown.push(useName);
			this.useNamesShownAsBooleanArray.push(false);
		} else {
			this.useNamesShown.splice(index, 0, useName);
			this.useNamesShownAsBooleanArray.splice(index, 0, false);
		}
		this.useNamesAdded(index, useName);
		return this.composeMinimap();
	}

	// =============================================================================================================================
	public onChangeUseName(elts: Element | RadioNodeList): void {
		const names: string[] = [];
		if (elts instanceof RadioNodeList) {
			Array.prototype.forEach.call(elts, (c: HTMLInputElement) => c.checked && names.push(c.value));
		} else if ((elts as HTMLInputElement).checked) {
			names.push((elts as HTMLInputElement).value);
		}
		this.setUseNamesSelected(names);
	}

	// =============================================================================================================================
	public onUpdate(): void {
		/**/
	}

	// =============================================================================================================================
	public removeUncheckedUseNames(): void {
		const selected = this.useNamesGetSelected();
		const namesRemoved: string[] = [];
		const indexesRemovedInReverse: number[] = [];
		for (let i = this.useNamesShown.length; --i >= 0; ) {
			// loop must run in reverse order so we can splice() away safely
			if (selected[i]) continue;
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

	// =============================================================================================================================
	public setUseNamesSelected(names: string[]): void {
		this.useNamesShownAsBooleanArray = this.mapUseNamesToBooleanArray(names);
		this.updateRealNamesShown();
	}

	// =============================================================================================================================
	public submit(): void {
		this.submitted = true;
		this.composeMinimap();
	}

	// =============================================================================================================================
	protected mapUseNamesToBooleanArray(names: string[]): boolean[] {
		const selected = names.sort();
		const maxSelected = selected.length - 1;
		let iSelected = 0;
		return this.useNamesShown.map(name => {
			if (iSelected > maxSelected || name !== selected[iSelected]) return false;
			iSelected++;
			return true;
		});
	}

	// =============================================================================================================================
	protected takeSnapshot(): void {
		/**/
	}

	// =============================================================================================================================
	protected updateRealNamesShown(): void {
		const selected = this.useNamesGetSelected();
		const checkedNames: string[] = [];
		this.useNamesShown.forEach((n, i) => selected[i] && checkedNames.push(Ea.namesAll[n]));
		if (this.realNamesShown.join('') !== checkedNames.join('')) {
			this.realNamesShown = checkedNames;
			this.takeSnapshot();
		}
	}

	// =============================================================================================================================
	protected useNamesGetSelected(): boolean[] {
		return this.useNamesShownAsBooleanArray;
	}

	// =============================================================================================================================
	private composeMinimap(): void {
		this.customWidgetIds = [...this.customWidgetIds]; // will trigger a full rerender on minimap
	}

	// =============================================================================================================================
	protected abstract updateRealNamesSelected(_namesRemoved: string[]): void;

	// =============================================================================================================================
	protected abstract useNamesAdded(_index: number, _useName: string): void;

	// =============================================================================================================================
	protected abstract useNamesRemoved(_indexesRemovedInReverse: number[]): void;
}

// =================================================================================================================================
//						E A R E A C T I V E
// =================================================================================================================================
export class EaReactive extends Ea {
	// =============================================================================================================================
	public constructor() {
		super();
	}

	// =============================================================================================================================
	protected updateRealNamesSelected(_namesRemoved: string[]): void {
		/**/
	}

	// =============================================================================================================================
	protected useNamesAdded(_: number, _n: string): void {
		this.useNamesShown = [...this.useNamesShown];
	}

	// =============================================================================================================================
	protected useNamesRemoved(_: number[]): void {
		this.useNamesShown = [...this.useNamesShown];
	}
}

// =================================================================================================================================
//						E A S T A T E
// =================================================================================================================================
export class EaState extends Ea {
	private setStateRealNamesShown: SetStrArray;
	private setStateUseNamesShown: SetStrArray;

	// =============================================================================================================================
	public constructor() {
		super();
	}

	// =============================================================================================================================
	public setStateMutators(setStateRealNamesShown: SetStrArray, setStateUseNamesShown: SetStrArray): void {
		this.setStateRealNamesShown = setStateRealNamesShown;
		this.setStateUseNamesShown = setStateUseNamesShown;
	}

	// =============================================================================================================================
	protected updateRealNamesSelected(_namesRemoved: string[]): void {
		/**/
	}

	// =============================================================================================================================
	protected updateRealNamesShown(): void {
		super.updateRealNamesShown();
		this.setStateRealNamesShown(this.realNamesShown);
	}

	// =============================================================================================================================
	protected useNamesAdded(_: number, _n: string): void {
		this.setStateUseNamesShown([...this.useNamesShown]);
	}

	// =============================================================================================================================
	protected useNamesRemoved(_: number[]): void {
		this.setStateUseNamesShown([...this.useNamesShown]);
	}
}

// =================================================================================================================================
//						E A R T H S E A
// =================================================================================================================================
export interface Earthsea extends FmmMapValues {
	adventure: string;
	adventure2: string;
	adventureAuto: string;
	agree: boolean;
	danceDate: string;
	danceRange: number;
	danceToggle: boolean;
	deed: string;
	email: string;
	quoteRadios: string;
	realName: string;
	realNames: string[];
	realNames2: string[];
	useName: string;
	useNames: string[];
	useNamesAll: string[];
}
