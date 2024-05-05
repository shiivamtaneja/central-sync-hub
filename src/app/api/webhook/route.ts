import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {

    const payload = await request.json();

    console.log(payload);
    console.log('chala');

    const pay = {
      data: {
        backup_code_enabled: false,
        banned: false,
        create_organization_enabled: true,
        created_at: 1714558679811,
        delete_self_enabled: true,
        email_addresses: [[Object]],
        external_accounts: [[Object]],
        external_id: null,
        first_name: 'Shivam',
        has_image: true,
        id: 'user_2frURBss0sEAwSoMz510jxD8mzC',
        image_url: 'https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvb2F1dGhfZ29vZ2xlL2ltZ18yZnJVUkZUV09BQ3pVMWFpcmI1elZoQ0hESXIifQ',
        last_active_at: 1714558679809,
        last_name: 'Taneja',
        last_sign_in_at: null,
        locked: false,
        lockout_expires_in_seconds: null,
        object: 'user',
        passkeys: [],
        password_enabled: false,
        phone_numbers: [],
        primary_email_address_id: 'idn_2frUR99l7ydFlKpKTKYdDg39A6f',
        primary_phone_number_id: null,
        primary_web3_wallet_id: null,
        private_metadata: {},
        profile_image_url: 'https://images.clerk.dev/oauth_google/img_2frURFTWOACzU1airb5zVhCHDIr',
        public_metadata: {},
        saml_accounts: [],
        totp_enabled: false,
        two_factor_enabled: false,
        unsafe_metadata: {},
        updated_at: 1714558679917,
        username: null,
        verification_attempts_remaining: 100,
        web3_wallets: []
      },
      object: 'event',
      type: 'user.created'
    };

    

    return NextResponse.json({
      data: 'nice'
    });

  } catch (err) {
    console.error('[WEBHOOK] ', err);

    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
