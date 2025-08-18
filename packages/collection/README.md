# @aria-ui/collection

## Classes

<a id="collection"></a>

### Collection

#### Constructors

<a id="constructor"></a>

##### Constructor

<dl>

<dt>

<code data-typedoc-code><i></i> new <a id="constructor" href="#constructor">Collection</a>(`items`, `loop`): [`Collection`](#collection)</code>

</dt>

</dl>

#### Properties

<dl>

<dt>

<code data-typedoc-code><i>readonly</i> <a id="loop" href="#loop">loop</a>: `boolean` = `true`</code>

</dt>

</dl>

#### Methods

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="first" href="#first">first</a>(): `null` \| `string`</code>

</dt>

<dd>

Returns the first enabled value.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="getelement" href="#getelement">getElement</a>(`value`): `null` \| `HTMLElement`</code>

</dt>

<dd>

Finds an element from its value.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="getvalues" href="#getvalues">getValues</a>(): `string`[]</code>

</dt>

<dd>

Returns all values.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="last" href="#last">last</a>(): `null` \| `string`</code>

</dt>

<dd>

Returns the last enabled value.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="next" href="#next">next</a>(`value`): `null` \| `string`</code>

</dt>

<dd>

Returns the next enabled value.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="prev" href="#prev">prev</a>(`value`): `null` \| `string`</code>

</dt>

<dd>

Returns the previous enabled value.

</dd>

</dl>

<dl>

<dt>

<code data-typedoc-code><i></i> <a id="size" href="#size">size</a>(): `number`</code>

</dt>

</dl>

## Type Aliases

<a id="itemfilter"></a>

### ItemFilter()

<dl>

<dt>

<code data-typedoc-code><i></i> type <a id="itemfilter" href="#itemfilter">ItemFilter</a> = (`options`) => `boolean`</code>

</dt>

<dd>

The filter function to determine if an item should be shown in the collection.

</dd>

</dl>

## Variables

<a id="defaultitemfilter"></a>

### defaultItemFilter

<dl>

<dt>

<code data-typedoc-code><i>const</i> <a id="defaultitemfilter" href="#defaultitemfilter">defaultItemFilter</a>: [`ItemFilter`](#itemfilter)</code>

</dt>

<dd>

A simple case-insensitive substring match filter.

</dd>

</dl>
