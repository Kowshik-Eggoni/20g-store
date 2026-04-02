import { CartForm } from '@shopify/hydrogen';
import { json } from '@shopify/remix-oxygen';

/**
 * Cart action — handles add/remove/update cart lines.
 * All CartForm submissions post to this route.
 */
export async function action({ request, context }) {
  const { cart } = context;

  const formData = await request.formData();
  const { action, inputs } = CartForm.getFormInput(formData);

  let result;

  switch (action) {
    case CartForm.ACTIONS.LinesAdd:
      result = await cart.addLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesUpdate:
      result = await cart.updateLines(inputs.lines);
      break;
    case CartForm.ACTIONS.LinesRemove:
      result = await cart.removeLines(inputs.lineIds);
      break;
    default:
      throw new Error(`Unknown cart action: ${action}`);
  }

  const headers = cart.setCartId(result.cart.id);
  return json(result, { headers });
}
