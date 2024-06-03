import { DirectiveBinding } from 'vue';

type ElementWithClickOutside = Element & {
	clickOutsideEvent: (event: Event) => void;
};

/**
 * # Click outside directive
 *
 * Runs a callback on a click outside of the element to which the directive is applied
 * @param el Element
 * @param binding DirectiveBinding
 */
export default {
	beforeMount(el: Element, binding: DirectiveBinding) {
		const element = el as ElementWithClickOutside; // Casting is OK here because we know we're about to add the additional property.
		element.clickOutsideEvent = function clickOutside(event) {
			// Clicked element is neither the el or its child
			if (!(el === event.target || element.contains(event.target as Node))) {
				// Invoke the provided method
				binding.value(event);
			}
		};

		document.addEventListener('click', element.clickOutsideEvent);
		document.addEventListener('keyup', element.clickOutsideEvent);
	},
	unmounted(element: ElementWithClickOutside) {
		// Remove the event listener when the bound element is unmounted
		if (element.clickOutsideEvent) {
			document.removeEventListener('click', element.clickOutsideEvent);
			document.removeEventListener('keyup', element.clickOutsideEvent);
		}
	},
};
