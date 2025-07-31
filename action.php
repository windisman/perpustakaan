<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

include "db_config.php"; // koneksi ke database

$postjson = json_decode(file_get_contents('php://input'), true);
$aksi = isset($postjson['aksi']) ? strip_tags($postjson['aksi']) : null;
$data = [];

switch ($aksi) {

    case "add_perpustakaan":
        try {
            $stmt = $pdo->prepare("INSERT INTO perpustakaan (judul, jenis, pengarang, tahunterbit, isbn, keterangan)
                                   VALUES (:judul, :jenis, :pengarang, :tahunterbit, :isbn, :keterangan)");
            $stmt->execute([
                ':judul' => $postjson['judul'],
                ':jenis' => $postjson['jenis'],
                ':pengarang' => $postjson['pengarang'],
                ':tahunterbit' => $postjson['tahunterbit'],
                ':isbn' => $postjson['isbn'],
                ':keterangan' => $postjson['keterangan'],
            ]);

            echo json_encode(['success' => true]);
        } catch (PDOException $e) {
            echo json_encode([
                'success' => false,
                'msg' => 'Gagal menyimpan data: ' . $e->getMessage()
            ]);
        }
        break;

    case "getdata":
        try {
            $stmt = $pdo->prepare("SELECT * FROM perpustakaan ORDER BY id DESC");
            $stmt->execute();
            $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'result' => $data]);
        } catch (PDOException $e) {
            echo json_encode([
                'success' => false,
                'msg' => 'Gagal mengambil data: ' . $e->getMessage()
            ]);
        }
        break;

    default:
        echo json_encode(['success' => false, 'msg' => 'Aksi tidak dikenal']);
        break;
}
?>