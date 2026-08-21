import groq from 'groq'

export const BUTTON_FIRST_PROJECTION = groq`select(
	defined(button[0]) => {
		"id": coalesce(button[0]._key, button[0]._id),
		"highlight": coalesce(button[0].highlight, false),
		"target": coalesce(button[0].target, false),
		"text": button[0].text,
		"href": select(
			button[0].type == "internal" => "/" + button[0].pageRef->slug.current,
			button[0].type == "custom" => button[0].href,
			null
		)
	},
	null
)`
