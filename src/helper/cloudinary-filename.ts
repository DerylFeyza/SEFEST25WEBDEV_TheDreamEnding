export function getFileNameFromUrl(url: string | File) {
	if (typeof url !== "string") {
		return url;
	}
	const urlParts = url.split("/");
	const fileName = urlParts[urlParts.length - 1];

	return fileName;
}
