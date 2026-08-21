import groq from 'groq'

export const IMAGE_PROJECTION = groq`
	"image": select(
		defined(image.asset->url) => image{
			asset->{
				_id,
				url,
				"metadata": {
					"dimensions": metadata.dimensions
				}
			}
		},
		null
	)
`
