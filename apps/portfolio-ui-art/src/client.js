import { createClient } from '@sanity/client'

export default createClient({
  projectId: "4l2esehf",
  dataset: "production",
  useCdn: true,
});