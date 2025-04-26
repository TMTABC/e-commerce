import umami from '@umami/node';

umami.init({
    websiteId: 'e09676c2-1da3-4e16-9a9c-a94b7640dc4e', // Your website id
    hostUrl: 'https://cloud.umami.is', // URL to your Umami instance
});

export const umamiTrackCheckoutSuccessEvent = async (payload:{
    [key:string]: string | number | Date
}) => {
    await umami.track("checkout_success",payload);
};