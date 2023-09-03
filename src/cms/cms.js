import CMS from 'decap-cms-app';
import uploadcare from 'netlify-cms-media-library-uploadcare';
import cloudinary from 'netlify-cms-media-library-cloudinary';

import BeatPagePreview from './preview-templates/BeatPagePreview';
import IndexPagePreview from './preview-templates/IndexPagePreview';

import '../components/Layout/Globals.css';

CMS.registerMediaLibrary(uploadcare);
CMS.registerMediaLibrary(cloudinary);

CMS.registerPreviewTemplate('index', IndexPagePreview);
CMS.registerPreviewTemplate('beats', BeatPagePreview);
