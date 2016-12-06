var strongLocation = window.location.pathname;
var findWebIdx = strongLocation.search('/web');
var webRoot = strongLocation.slice(findWebIdx);
export const strongRoot = strongLocation.slice(0, findWebIdx);

export let myLocation = webRoot;

export let myLocHref = window.location.href;

export const totalRoot = strongRoot + myLocation;


export function navigating(placeToGo){

	(placeToGo === 'home') ? window.location = `${strongRoot}/web/` : window.location = `${strongRoot}/web/${placeToGo}`;

}
