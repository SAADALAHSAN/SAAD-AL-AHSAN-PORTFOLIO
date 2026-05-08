/**
 * Utility for tracking events and page views with Google Analytics 4.
 */

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const trackPageView = (path: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title,
    });
  }
};

/**
 * Track custom events (e.g. button clicks)
 * @param {string} eventName 
 * @param {object} params 
 */
export const trackEvent = (eventName: string, params: object = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, params);
  }
};

