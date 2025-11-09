import markdownit from 'markdown-it'
// @ts-ignore markdown-it-attrs has no types and it’s not worth the effort adding a *.d.ts file
import markdownItAttrs from 'markdown-it-attrs'
import markdownItKbd from '../src'

const trimmed = (text: string) => text.replace(/\n\s*/g, '\n').replace(/^\n/, '')

describe('markdown-it-kbd', () => {
	const md = markdownit().use(markdownItKbd)

	it('renders [[x]] as <kbd>x</kbd>', () => {
		expect(md.render(trimmed(`
			# Test

			This combination is cool: [[alt]]+[[f4]].
		`))).toEqual(trimmed(`
			<h1>Test</h1>
			<p>This combination is cool: <kbd>alt</kbd>+<kbd>f4</kbd>.</p>
		`))
	})

	it('supports nested keystroke tags', () => {
		expect(md.render(trimmed(`
			[[[[Shift]]+[[F3]]]]
		`))).toEqual(trimmed(`
			<p><kbd><kbd>Shift</kbd>+<kbd>F3</kbd></kbd></p>
		`))
	})

	it.each([
		['[[\\[]]', '<kbd>[</kbd>'],
		['[[\\]]]', '<kbd>]</kbd>'],
		['[[\\[\\[]]', '<kbd>[[</kbd>'],
		['[[\\]\\]]]', '<kbd>]]</kbd>'],
	])('supports escaped delimiters: %s', (input, expected) => {
		expect(md.render(input)).toBe(`<p>${expected}</p>\n`)
	})

	it('supports deep nesting and markup in nested tags', () => {
		expect(md.render(trimmed(`
			[[[[[[Shift]]\`+\`[[_long[[x]]_]]]]-Ctrl]]+[[F4]]	
		`))).toEqual(trimmed(`
			<p><kbd><kbd><kbd>Shift</kbd><code>+</code><kbd><em>long<kbd>x</kbd></em></kbd></kbd>-Ctrl</kbd>+<kbd>F4</kbd></p>
		`))
	})

	it('does not harm link rendering', () => {
		expect(md.render(trimmed(`
			# Test

			This combination is cool: [[alt]]+[[f4]]. This link still works: [Google](http://google.com).
		`))).toEqual(trimmed(`
			<h1>Test</h1>
			<p>This combination is cool: <kbd>alt</kbd>+<kbd>f4</kbd>. This link still works: <a href="http://google.com">Google</a>.</p>
		`))
	})

	it('can be included in links', () => {
		expect(md.render(trimmed(`
			[[[[[Ctrl]]+[[V]]]]](https://devnull-as-a-service.com/dev/null)
		`))).toEqual(trimmed(`
			<p><a href="https://devnull-as-a-service.com/dev/null"><kbd><kbd>Ctrl</kbd>+<kbd>V</kbd></kbd></a></p>
		`))
	})

	it('allows markup within [[ and ]]', () => {
		expect(md.render(trimmed(`
			[[*i*]] [[\`foo\`]]
		`))).toBe(trimmed(`
			<p><kbd><em>i</em></kbd> <kbd><code>foo</code></kbd></p>
		`))
	})

	it.each([
		['[[foo]] [[', '<kbd>foo</kbd> [['],
		['[[bar]] ]] hey', '<kbd>bar</kbd> ]] hey'],
		['[[this]] [[ [[and that]]', '<kbd>this</kbd> [[ <kbd>and that</kbd>'],
		['[[that]] ]] [[and this]]', '<kbd>that</kbd> ]] <kbd>and this</kbd>'],
		['[[ *some markup* [[ `more markup` [[valid]] **even more**', '[[ <em>some markup</em> [[ <code>more markup</code> <kbd>valid</kbd> <strong>even more</strong>'],
		['[[', '[['],
		['[[[x]]', '[<kbd>x</kbd>'],
		['[[[x]]]', '[<kbd>x</kbd>]'],
		['[[*test*', '[[<em>test</em>'],
		['[[[[Shift]]+[[F3]]]', '[[<kbd>Shift</kbd>+<kbd>F3</kbd>]'],
		['[[\\\\]]', '<kbd>\\</kbd>'],
	])('renders correctly: %s', (input, expected) => {
		expect(md.render(input)).toBe(`<p>${expected}</p>\n`)
	})

	describe('markdown-it-attrs compatibility', () => {
		const mdWithAttrs = markdownit()
			.use(markdownItKbd)
			.use(markdownItAttrs)

		it('can apply custom attributes', () => {
			expect(mdWithAttrs.render(trimmed(`
				[[alt]]{data-custom=foo}+[[f4]]{data-custom=bar}
			`))).toEqual(trimmed(`
				<p><kbd data-custom="foo">alt</kbd>+<kbd data-custom="bar">f4</kbd></p>
			`))
		})

		it('can apply CSS classes', () => {
			expect(mdWithAttrs.render(trimmed(`
				[[ctrl]]{.important}+[[v]]{.important}
			`))).toEqual(trimmed(`
				<p><kbd class="important">ctrl</kbd>+<kbd class="important">v</kbd></p>
			`))
		})
	})
})
