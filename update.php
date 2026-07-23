<?php

require __DIR__ . '/vendor/autoload.php';

$app = require_once __DIR__ . '/bootstrap/app.php';

$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);

$kernel->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

$usersToUpdate = [
    'valeria@mail.ru' => 'valpass',
    'maxmail@mail.ru' => 'maxpass',
    'sergey@mail.ru' => 'serpass',
    'alexmail@mail.ru' => 'alexpass',
];

foreach ($usersToUpdate as $email => $newPassword) {
    $user = User::where('email', $email)->first();

    if ($user) {
        $user->password = Hash::make($newPassword);
        $user->save();

        echo "Password updated successfully for user: $email\n";
    } else {
        echo "User not found with email: $email\n";
    }
}